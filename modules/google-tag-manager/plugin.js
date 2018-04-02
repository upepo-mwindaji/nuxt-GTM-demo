import Vue from 'vue'

// Include Google Tag Manager Script
window['<%= options.layer %>'] = window['<%= options.layer %>'] || [];
window['<%= options.layer %>'].push({
  'event': 'gtm.js',
  'gtm.start': new Date().getTime()
});

const gtmEvents = {
  custom : function (obj) {
    try {
      if (window && window['<%= options.layer %>']) {
        throw "missing dataLayer";
      }
      if (typeof obj === 'object' && obj.hasOwnProperty('event')) {
        throw "missing event";
      }
      window['<%= options.layer %>'].push(obj)
    } catch(err) {
      console.error(err);
    }
  },
  standard : function (interaction, category, action, label, value) {
    let obj = {};
    try {

      if (typeof arguments[0] === 'undefined') {
        throw 'standard event not defined';
      }
      if (arguments[0] === null) {
        throw 'standard event interaction needs to be defined, aborted event push';
      }
      if (Array.isArray(arguments[0])) {
        throw 'standard event argument should not be an array, aborted event push';
      }

      if (typeof interaction === 'boolean') {
        obj.interaction = interaction;
      } else {
        throw 'interaction needs to be boolean';
      }

      if (typeof category === 'string') {
        obj.category = category;
      } else if (category === null){
        obj.category = undefined;
        console.warn('event category is not defined');
      } else {
        throw 'standard event category should be a string or null, aborted event push';
      }

      if (typeof action === 'string') {
        obj.action = action;
      } else if (action === null){
        obj.action = undefined;
        console.warn('standard event action is not defined');
      } else {
        throw 'standard event action should be a string or null, aborted event push';
      }

      if (typeof label === 'string') {
        obj.label = label;
      } else if (label === null || typeof label === 'undefined'){
        obj.label = undefined;
        console.warn('standard event label is not defined, pushed event');
      } else {
        obj.label = String(label);
        console.warn('standard event label should be a string or null, pushed event');
      }

      if (typeof value=== 'number') {
        obj.value = value;
      } else if (value === null || typeof value === 'undefined'){
        obj.value = undefined;
        console.warn('standard event value is not defined, pushed event');
      } else {
        obj.value = Number(value);
        console.warn('standard event value should be a number, pushed event');
      }

      if (typeof arguments[0] === 'object') {
        if (!arguments[0].hasOwnProperty('interaction')) {
          throw 'standard event object should have at least interaction boolean'
        }
        if (!arguments[0].hasOwnProperty('category')) {
          throw 'standard event object should have at least category boolean'
        }
        if (!arguments[0].hasOwnProperty('action')) {
          throw 'standard event object should have at least action boolean'
        }
        obj.interaction = arguments[0].interaction
        obj.category = arguments[0].category
        obj.action = arguments[0].action

        if (arguments[0].hasOwnProperty('label')) {
          obj.label = arguments[0].label
        } else {
          obj.label = undefined
          console.warn('standard event label is not defined, pushed event')
        }

        if (arguments[0].hasOwnProperty('value')) {
          obj.value = arguments[0].value
        } else {
          obj.value = undefined
          console.warn('standard event value is not defined, pushed event')
        }
      }

      if (window && window['<%= options.layer %>']) {
        window['<%= options.layer %>'].push({
          'event': 'Nuxt Standard Event',
          'nuxtStandardEvent' : obj
        })
      } else {
        throw 'missing dataLayer';
      }

    }
    catch(err) {
      console.error(err);
      console.error(arguments);
    }
  }
};


Vue.mixin({
  // we are updating the head in the mixin to ensure head change is fired on every page
  // we are adding dataLayer and container ID to retrieve them in the head onchange function
  head () {
    return {
      meta: [
        { hid: 'GTM-dataLayer', name: 'GTM-dataLayer', content: '<%= options.layer %>' },
        { hid: 'GTM-container', name: 'GTM-container', content: '<%= options.id %>' }
      ]
    };
  },
  // For testing purposes, mounted page event is earlier the heach change
  // 1) check that the mounted element is a page
  // here it is assumed only pages can be second child of layout (https://nuxtjs.org/guide/views)
  // 2) check that the pageview has not be triggered already
  // here we will use updates of dataLayer to debounce pageviews on each route change
  mounted () {
    this.$nextTick(() => {
      let isPage = (this.$el.parentElement.parentElement.getAttribute('id') === '__layout')
      if (isPage) {
        let isRouteOpen =  (window.google_tag_manager['<%= options.id %>'].dataLayer.get('nuxtPageMounted') === 'open');
        if (isRouteOpen) {
          window['<%= options.layer %>'].push({
            'event': 'nuxtPageMounted',
            'nuxtPageMounted': 'closed'
          });
        }
      }
    });
  },
  methods: {
    // helper instance method to push custom events to dataLayer
    // obj needs to be {event: 'event name', OtherAttributes: string or object ...}
    gtmCustomEvent: gtmEvents.custom,
    // helper instance method to push standard events to dataLayer that can be autotracked by GTM
    // arguments can be comma separated or passed in object
    //   interaction: interaction, // boolean (true if interaction event)
    //   category: category, // string
    //   action: action, // string
    //   label: label, // string
    //   value: value, // number
    gtmStandardEvent: gtmEvents.standard
  }
})

// Every time the route changes (fired on initialization too)
export default ({app: {router}}) => {
  router.afterEach((to, from) => {
    window['<%= options.layer %>'].push(to.gtm || {
      'event': 'nuxtRouteChange',
      'nuxtRoute': {
        path: to.path,
        location: window.location.host + to.path,
        params: to.params,
        query: to.query
      },
      // variables to debounce page mounted event and head changed event
      'nuxtPageMounted': 'open',
      'nuxtHeadChange': 'open'
    });
  });
};
