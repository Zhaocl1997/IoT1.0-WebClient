<template>
  <div class="footer">
    <div class="footer_con">
      <div class="footer_con_wrap">
        <div class="footer_about">
          <h4 class="title">About</h4>
          <ul class="link_list">
            <li>
              <a href="https://github.com/Zhaocl1997">
                <i>Github</i>
              </a>
            </li>
            <li>
              <a href="https://weibo.com/zhaocl97">
                <i>Weibo</i>
              </a>
            </li>
          </ul>
        </div>
        <div class="footer_help">
          <h4 class="title">Help</h4>
          <ul class="link_list">
            <li>
              <a href>
                <i>Process</i>
              </a>
            </li>
            <li>
              <a href>
                <i>Experience</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.footer {
  background-color: deepskyblue;
  height: 100px;
  width: 100%;
}
.footer_con {
  margin: 0 auto;
  width: 100%;
  min-height: 100px;
  background: url(../assets/logo.png) 75% no-repeat;
  background-size: contain;
}
.footer_con_wrap {
  padding-top: 20px;
}
.footer_about {
  float: left;
  margin-left: 25%;
}
.footer_help {
  float: left;
  margin-left: 50px;
}
.title {
  font-size: 20px;
  color: #333;
  font-weight: 400;
}
li {
  list-style: none;
  margin: 2px;
}
a {
  text-decoration: none;
  color: #747b81;
}
i {
  font-style: normal;
}
</style>