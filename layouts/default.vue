<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

a {
  margin:20px;
}

.header {
  /*height: 10vh;*/
  /*position: relative;*/
  display: flex;
}

.container {
  height: 90vh;
  /*position: relative;*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

button {
  font-size: 42px;
  cursor:pointer;
}

.button--home {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid black;
  color: black;
  text-decoration: none;
  padding: 4px 30px;
}

.button--home:hover {
  color: white;
  background-color: black;
}

.button--purple {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #5d3f92;
  color: #5d3f92;
  text-decoration: none;
  padding: 10px 30px;
}

.button--purple:hover {
  color: #fff;
  background-color: #5d3f92;
}

.button--blue {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3685c3;
  color: #3685c3;
  text-decoration: none;
  padding: 10px 30px;
}

.button--blue:hover {
  color: #fff;
  background-color: #3685c3;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
