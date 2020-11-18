(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05cbfa52"],{2355:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("loading",{attrs:{active:t.isLoading,"can-cancel":!0,loader:"dots",color:"black",width:100,"background-color":"rgba(148,148,148)"},on:{"update:active":function(a){t.isLoading=a}}}),s("div",{staticClass:"container"},[t.cartProductsLen>0?s("div",{staticClass:"row mt-4 justify-content-center"},[s("div",{staticClass:"col-10"},[s("orderProcess")],1),s("div",{staticClass:"col-lg-10 mt-4"},[s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"carts table table-hover"},[t._m(0),s("tbody",t._l(t.cartProducts.carts,(function(a){return s("tr",{key:a.id},[s("td",{staticClass:"d-none d-md-table-cell py-2"},[s("img",{staticClass:"carts-img border border-primary",attrs:{src:a.product.imageUrl,alt:""}})]),s("td",{staticClass:"align-middle"},[s("h4",{staticClass:"h6 mb-0 carts-title"},[t._v(" "+t._s(a.product.title)+" ")])]),s("td",{staticClass:"align-middle text-center"},[s("i",{staticClass:"fas fa-minus carts-addordel",on:{click:function(s){return t.changeNum(a.product.id,a.id,a.qty-1)}}}),s("span",{staticClass:"px-2"},[t._v(t._s(a.qty))]),s("i",{staticClass:"fas fa-plus carts-addordel",on:{click:function(s){return t.changeNum(a.product.id,a.id,a.qty+1)}}})]),s("td",{staticClass:"text-right align-middle"},[t._v(" "+t._s(t._f("currency")(a.final_total))+" ")]),s("td",{staticClass:"text-center align-middle"},[s("button",{staticClass:"btn btn-outline-secondary rounded-circle",on:{click:function(s){return t.delCartProduct(a.id)}}},[s("i",{staticClass:"fas fa-trash-alt"})])])])})),0),s("tfoot",[s("tr",{staticClass:"text-right"},[s("td",{staticClass:"d-none d-md-table-cell"}),s("td",{attrs:{colspan:"3"}},[t._v("總計")]),s("td",[t._v(t._s(t._f("currency")(t.cartProducts.total)))])])])])]),s("div",{staticClass:"row justify-content-between"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"d-flex justify-content-between align-items-center mb-4"},[s("router-link",{staticClass:"h4 mb-0",attrs:{to:"/cart"}},[s("i",{staticClass:"fas fa-chevron-left mr-1"}),t._v(" 繼續購物 ")]),s("router-link",{staticClass:"btn btn-secondary rounded-0",attrs:{tag:"input",to:"/Checkout",type:"button",value:"填寫訂單資料"}})],1)])])])]):s("div",{staticClass:"mt-4"},[s("div",[s("div",{staticClass:"text-center my-10"},[s("h4",{staticClass:"h3"},[t._v("您的購物車目前是空的！")]),s("router-link",{staticClass:"text-decoration-none h4",attrs:{to:"/customerProducts"}},[s("i",{staticClass:"fas fa-reply"}),t._v(" 來去購物！ ")])],1),s("section",{staticClass:"container mb-8"},[s("h3",{staticClass:"mb-0"},[t._v("商品推薦")]),s("hr",{staticClass:" border-primary"}),s("div",{staticClass:"row"},t._l(t.guided,(function(a,e){return s("div",{key:e,staticClass:"col-md-4 mb-4 mb-md-0",attrs:{"data-aos":"zoom-out","data-aos-delay":"100"}},[s("div",{staticClass:"bg-cover position-relative home-second-bgi my-0",style:{backgroundImage:"url("+a.image+")"}},[s("div",{staticClass:"home-border text-white h3 font-weight-bold"},[s("router-link",{staticClass:"d-flex-center h-100 home-product-text",attrs:{tag:"div",to:{path:"/customerProducts",query:{category:a.title}}}},[s("span",[t._v(t._s(a.title))])])],1)])])})),0)])])])])],1)},c=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("thead",[s("tr",[s("th",{staticClass:"d-none d-md-table-cell",attrs:{width:"150"}},[t._v("縮圖")]),s("th",{attrs:{col:""}},[t._v("品名")]),s("th",{staticClass:"text-nowrap text-center",attrs:{width:"100"}},[t._v("數量")]),s("th",{staticClass:"text-right",attrs:{col:""}},[t._v("單價")]),s("th",{staticClass:"text-center",attrs:{col:""}},[t._v("刪除")])])])}],i=(s("99af"),s("c9bd")),r=s("4c77"),n={name:"Cart",data:function(){return{isLoading:!1,guided:[{title:"BTS",image:"https://ibighit.com/bts/images/bts/discography/2_cool_4_school/album-cover.jpg"},{title:"TWICE",image:"https://lv2-cdn.azureedge.net/twice/ff169a51fb0e4c73aab0afdb1c196337-TWICE%20EYES%20WIDE%20OPEN_ONLINECOVER.jpg"},{title:"STRAY KIDS",image:"https://lv2-cdn.azureedge.net/straykids/TOP-English_ver.jpg"}]}},components:{orderProcess:i["a"]},mixins:[r["a"]],methods:{delCartProduct:function(t){var a=this,s="".concat("https://vue-course-api.hexschool.io/","api/").concat("minjia","/cart/").concat(t);a.$http.delete(s).then((function(t){a.getCartProducts()}))},changeNum:function(t,a,s){var e=this;if(s>=1){e.delCartProduct(a);var c="".concat("https://vue-course-api.hexschool.io/","api/").concat("minjia","/cart"),i={product_id:t,qty:s};e.$http.post(c,{data:i}).then((function(t){}))}else s<=1&&e.delCartProduct(a)}}},l=n,o=s("2877"),d=Object(o["a"])(l,e,c,!1,null,null,null);a["default"]=d.exports},c9bd:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row justify-content-center"},[s("div",{staticClass:"col-lg-3"},[s("h6",{staticClass:"border border-primary bg-primary text-white text-center rounded py-2"},[t._v(" 1.確認購物清單 "),t._t("change1",[s("i",{staticClass:"far fa-circle"})])],2)]),s("div",{staticClass:"col-lg-3"},[t._t("change2",[t._m(0)])],2),s("div",{staticClass:"col-lg-3"},[t._t("change3",[t._m(1)])],2)])},c=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("h6",{staticClass:"border border-primary text-center rounded py-2"},[t._v(" 2.填寫訂單資料 "),s("i",{staticClass:"far fa-circle"})])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("h6",{staticClass:"border border-primary text-center rounded py-2"},[t._v(" 3.付款 & 完成 "),s("i",{staticClass:"far fa-circle"})])}],i={name:"OrderProcess"},r=i,n=s("2877"),l=Object(n["a"])(r,e,c,!1,null,null,null);a["a"]=l.exports}}]);
//# sourceMappingURL=chunk-05cbfa52.50c28bc2.js.map