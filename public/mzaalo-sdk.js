(()=>{"use strict";var e={542:(e,r)=>{var o,t,s;Object.defineProperty(r,"__esModule",{value:!0}),r.Methods=r.SocialPartnerTypes=r.UserTypes=void 0,(s=r.UserTypes||(r.UserTypes={})).PREMIUM="PREMIUM",s.FREE="FREE",(t=r.SocialPartnerTypes||(r.SocialPartnerTypes={})).FACEBOOK="FACEBOOK",t.APPLE="APPLE",t.GOOGLE="GOOGLE",(o=r.Methods||(r.Methods={})).GET="GET",o.POST="POST",o.PUT="PUT"},735:(e,r,o)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.getRewardOffersAPI=r.getBalanceTransactionsAPI=r.getBalanceAPI=r.setUserTypeAPI=r.guestLoginAPI=r.loginRegisterAPI=r.initAPI=void 0;const t=o(354),s=o(542),a=o(698),n=async({url:e,method:r,headers:o,body:t,params:s=""})=>{const n=Object.assign(Object.assign({},o),{"Content-Type":"application/json"}),i=JSON.stringify(t),c=await fetch(`${a.baseURL}${e}${s}`,{method:r,headers:n,body:i});return await c.json()};r.initAPI=async({headers:e})=>await n({url:t.init,method:s.Methods.GET,headers:e}),r.loginRegisterAPI=async({headers:e,body:r})=>await n({url:t.login,method:s.Methods.POST,headers:e,body:r}),r.guestLoginAPI=async({headers:e,body:r})=>await n({url:t.guestLogin,method:s.Methods.POST,headers:e,body:r}),r.setUserTypeAPI=async({headers:e,body:r})=>await n({url:t.setUserType,method:s.Methods.PUT,headers:e,body:r}),r.getBalanceAPI=async({headers:e})=>await n({url:t.getBalance,method:s.Methods.GET,headers:e}),r.getBalanceTransactionsAPI=async({headers:e,params:r})=>await n({url:t.getTransactions,method:s.Methods.GET,headers:e,params:r}),r.getRewardOffersAPI=async({headers:e})=>await n({url:t.getRewards,method:s.Methods.GET,headers:e})},698:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.localStoragePrefix=r.baseURL=void 0,r.baseURL="https://staging.mzaalo.com/joint-journey-sdk/api/v2",r.localStoragePrefix="mzaaloSDK"},354:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.getRewards=r.getTransactions=r.getBalance=r.guestLogin=r.setUserType=r.login=r.init=void 0,r.init="/init",r.login="/login",r.setUserType="/set-user-type",r.guestLogin="/guest-login",r.getBalance="/balance",r.getTransactions="/transactions",r.getRewards="/rewards"},960:(e,r,o)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.getRewardOffers=r.getBalanceTransactions=r.getBalance=r.setUserType=r.logout=r.guestLogin=r.register=r.socialLogin=r.login=r.init=void 0;const t=o(735),s=o(542),a=o(928);r.init=e=>new Promise((async(r,o)=>{var s;try{if(!e)throw new Error("Partnercode is required");const o={partnercode:e},n=await(0,t.initAPI)({headers:o});if(!(null==n?void 0:n.success))throw new Error("Invalid Partnercode");(0,a.setItemInLocalStorage)("partnercode",e);const i=null===(s=null==n?void 0:n.data)||void 0===s?void 0:s.config;(0,a.setItemInLocalStorage)("partnerConfig",JSON.stringify(i)),r({success:!0,message:"Successfully initialized"})}catch(e){o({success:!1,message:e.message})}})),r.login=e=>new Promise((async(r,o)=>{var n,i,c;try{const{email:o,phone:d,phoneCountryCode:l,partnerUserId:g,userType:u}=e||{},m=(0,a.getItemFromLocalStorage)("partnercode");if(!m)throw new Error("Partnercode not found");if(!o&&!d)throw new Error("Email or phone is required");if(d&&!l)throw new Error("Phone country code is required");if(o&&!a.emailRegex.test(o))throw new Error("Email is invalid");if(!g)throw new Error("Partner user id is required");if(!u)throw new Error("User type is required");if(!Object.values(s.UserTypes).includes(u))throw new Error("User type is invalid");const w={email:o,phone:d,phoneCountryCode:l,partnerUserId:g,userType:u},h=(0,a.getItemFromLocalStorage)("guestLoginToken"),p={partnercode:m};h&&(p.authorization=h);const y=await(0,t.loginRegisterAPI)({headers:p,body:w});if(!(null==y?void 0:y.success))throw new Error(y.message);(0,a.removeItemFromLocalStorage)("guestLoginToken");const v=null===(i=null===(n=null==y?void 0:y.data)||void 0===n?void 0:n.data)||void 0===i?void 0:i.token,I=null===(c=null==y?void 0:y.data)||void 0===c?void 0:c.data.renewToken;(0,a.setItemInLocalStorage)("token",v),(0,a.setItemInLocalStorage)("renewToken",I),r(y)}catch(e){o({success:!1,message:e.message})}})),r.socialLogin=e=>new Promise((async(r,o)=>{var n,i,c;try{const{email:o,phone:d,phoneCountryCode:l,partnerUserId:g,userType:u,source:m}=e||{},w=(0,a.getItemFromLocalStorage)("partnercode");if(!w)throw new Error("Partnercode not found");if(!o&&!d)throw new Error("Email or phone is required");if(d&&!l)throw new Error("Phone country code is required");if(o&&!a.emailRegex.test(o))throw new Error("Email is invalid");if(!g)throw new Error("Partner user id is required");if(!u)throw new Error("User type is required");if(!Object.values(s.UserTypes).includes(u))throw new Error("User type is invalid");if(m&&!Object.values(s.SocialPartnerTypes).includes(m))throw new Error("Social login type is invalid");const h={email:o,phone:d,phoneCountryCode:l,partnerUserId:g,partnerSocialLogin:m,userType:u},p=(0,a.getItemFromLocalStorage)("guestLoginToken"),y={partnercode:w};p&&(y.authorization=p);const v=await(0,t.loginRegisterAPI)({body:h,headers:y});if(!(null==v?void 0:v.success))throw new Error(v.message);(0,a.removeItemFromLocalStorage)("guestLoginToken");const I=null===(i=null===(n=null==v?void 0:v.data)||void 0===n?void 0:n.data)||void 0===i?void 0:i.token,f=null===(c=null==v?void 0:v.data)||void 0===c?void 0:c.data.renewToken;(0,a.setItemInLocalStorage)("token",I),(0,a.setItemInLocalStorage)("renewToken",f),r(v)}catch(e){o({success:!1,message:e.message})}})),r.register=e=>new Promise((async(r,o)=>{var n,i,c;try{const{email:o,phone:d,phoneCountryCode:l,partnerUserId:g,userType:u}=e||{},m=(0,a.getItemFromLocalStorage)("partnercode");if(!m)throw new Error("Partnercode not found");if(!o&&!d)throw new Error("Email or phone is required");if(d&&!l)throw new Error("Phone country code is required");if(o&&!a.emailRegex.test(o))throw new Error("Email is invalid");if(!g)throw new Error("Partner user id is required");if(!u)throw new Error("User type is required");if(!Object.values(s.UserTypes).includes(u))throw new Error("User type is invalid");const w={email:o,phone:d,phoneCountryCode:l,partnerUserId:g,userType:u},h=(0,a.getItemFromLocalStorage)("guestLoginToken"),p={partnercode:m};h&&(p.authorization=h);const y=await(0,t.loginRegisterAPI)({body:w,headers:p});if(!(null==y?void 0:y.success))throw new Error(y.message);(0,a.removeItemFromLocalStorage)("guestLoginToken");const v=null===(i=null===(n=null==y?void 0:y.data)||void 0===n?void 0:n.data)||void 0===i?void 0:i.token,I=null===(c=null==y?void 0:y.data)||void 0===c?void 0:c.data.renewToken;(0,a.setItemInLocalStorage)("token",v),(0,a.setItemInLocalStorage)("renewToken",I),r(y)}catch(e){o({success:!1,message:e.message})}})),r.guestLogin=e=>new Promise((async(r,o)=>{var s;try{const{geoCode:o,guestUserId:n}=e||{},i=(0,a.getItemFromLocalStorage)("partnercode");if(!i)throw new Error("Partnercode not found");if(!n)throw new Error("Guest user id is required");const c={geoCode:o,guestUserId:n},d={partnercode:i},l=await(0,t.guestLoginAPI)({body:c,headers:d});if(!(null==l?void 0:l.success))throw new Error(l.message);const g=null===(s=null==l?void 0:l.data)||void 0===s?void 0:s.token;(0,a.setItemInLocalStorage)("guestLoginToken",g),r(l)}catch(e){o({success:!1,message:e.message})}})),r.logout=e=>new Promise((async(o,t)=>{try{const{geoCode:t,guestUserId:s}=e||"";if(!(0,a.getItemFromLocalStorage)("partnercode"))throw new Error("Partnercode not found");if(!s)throw new Error("Guest user id is required");if((0,a.removeItemFromLocalStorage)("guestLoginToken"),(0,a.removeItemFromLocalStorage)("token"),(0,a.removeItemFromLocalStorage)("renewToken"),!(await(0,r.guestLogin)({geoCode:t,guestUserId:s})).success)throw new Error("Error while logging out");o({success:!0,message:"Logged out successfully"})}catch(e){t({success:!1,message:e.message})}})),r.setUserType=e=>new Promise((async(r,o)=>{var n;try{const o=(0,a.getItemFromLocalStorage)("partnercode");if(!o)throw new Error("Partnercode not found");if(!e)throw new Error("User type is required");if(!Object.values(s.UserTypes).includes(e))throw new Error("User type is invalid");const i=(0,a.getItemFromLocalStorage)("token");if(!i)throw new Error("Please login first");const c={partnercode:o,authorization:i},d={userType:e},l=await(0,t.setUserTypeAPI)({headers:c,body:d});if(!(null==l?void 0:l.success))throw new Error(l.message);const g=null===(n=null==l?void 0:l.data)||void 0===n?void 0:n.token;(0,a.setItemInLocalStorage)("guestLoginToken",g),r(l)}catch(e){o({success:!1,message:e.message})}})),r.getBalance=()=>new Promise((async(e,r)=>{var o;try{const r=(0,a.getItemFromLocalStorage)("partnercode");if(!r)throw new Error("Partnercode not found");const s=(0,a.getItemFromLocalStorage)("token");if(!s)throw new Error("Please login first");const n={partnercode:r,authorization:s},i=await(0,t.getBalanceAPI)({headers:n});if(!(null==i?void 0:i.success))throw new Error(i.message);const c=null===(o=null==i?void 0:i.data)||void 0===o?void 0:o.token;(0,a.setItemInLocalStorage)("guestLoginToken",c),e(i)}catch(e){r({success:!1,message:e.message})}})),r.getBalanceTransactions=e=>new Promise((async(r,o)=>{var s;try{const{page:o,items:n}=e||"",i=(0,a.getItemFromLocalStorage)("partnercode");if(!i)throw new Error("Partnercode not found");const c=(0,a.getItemFromLocalStorage)("token");if(!c)throw new Error("Please login first");const d={partnercode:i,authorization:c};let l,g={};o&&(g.page=o),n&&(g.items=n),(o||n)&&(l=(0,a.createQueryString)(g));const u=await(0,t.getBalanceTransactionsAPI)({headers:d,params:l});if(!(null==u?void 0:u.success))throw new Error(u.message);const m=null===(s=null==u?void 0:u.data)||void 0===s?void 0:s.token;(0,a.setItemInLocalStorage)("guestLoginToken",m),r(u)}catch(e){o({success:!1,message:e.message})}})),r.getRewardOffers=()=>new Promise((async(e,r)=>{try{const r=(0,a.getItemFromLocalStorage)("partnercode");if(!r)throw new Error("Partnercode not found");const o={partnercode:r},s=await(0,t.getRewardOffersAPI)({headers:o});if(!(null==s?void 0:s.success))throw new Error(s.message);e(s)}catch(e){r({success:!1,message:e.message})}}))},928:(e,r,o)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.removeItemFromLocalStorage=r.setItemInLocalStorage=r.getItemFromLocalStorage=r.createQueryString=r.emailRegex=void 0;const t=o(698);r.emailRegex=new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),r.createQueryString=(e={})=>{let r="";if(Object.keys(e).length>0){let o=new URLSearchParams;for(const r in e)e[r]&&o.append(r,e[r]);[...o.entries()].length>0&&(r+=`?${o.toString()}`)}return r},r.getItemFromLocalStorage=e=>localStorage.getItem(`${t.localStoragePrefix}${e}`),r.setItemInLocalStorage=(e,r)=>localStorage.setItem(`${t.localStoragePrefix}${e}`,r),r.removeItemFromLocalStorage=e=>localStorage.removeItem(`${t.localStoragePrefix}${e}`)}},r={},o=function o(t){var s=r[t];if(void 0!==s)return s.exports;var a=r[t]={exports:{}};return e[t](a,a.exports,o),a.exports}(960);window.MzaaloSDK=o})();