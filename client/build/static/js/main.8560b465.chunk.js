(this["webpackJsonpliteracy-website"]=this["webpackJsonpliteracy-website"]||[]).push([[0],{107:function(e,t){},108:function(e,t,a){},134:function(e,t,a){},140:function(e,t,a){},161:function(e,t,a){},162:function(e,t,a){},163:function(e,t,a){},164:function(e,t,a){},165:function(e,t,a){},166:function(e,t,a){},167:function(e,t,a){},168:function(e,t,a){},194:function(e,t){},195:function(e,t){},196:function(e,t){},197:function(e,t){},198:function(e,t){},199:function(e,t,a){},205:function(e,t,a){},206:function(e,t,a){},208:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a(0),r=a.n(s),i=a(18),o=a.n(i),c=(a(134),a(22)),l=a(13),d=a(14),u=a(16),j=a(15),h=a(236),p=a(61),b=(a(80),function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={},e}return Object(d.a)(a,[{key:"render",value:function(){return Object(n.jsx)("div",{className:"Info-block",children:Object(n.jsxs)(h.a,{className:"header-container",children:[Object(n.jsx)("h1",{className:"page-title",style:{color:"#434343"},children:"Literacy Website"}),Object(n.jsx)(p.a,{color:"textSecondary",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})]})})}}]),a}(s.Component)),O=a(113),g=a.n(O),m=a(25),f=function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"LandingDiv",children:[Object(n.jsx)(b,{}),Object(n.jsx)("div",{style:{margin:40,marginBottom:5,textAlign:"center"},children:Object(n.jsx)(g.a,{})}),Object(n.jsx)("div",{className:"landing-page-login",children:Object(n.jsx)(m.b,{to:"/login",children:Object(n.jsx)("button",{className:"landing-page-button",children:"Login/Signup"})})})]})}}]),a}(s.Component),x=a(257),v=a(241),y=a(242),C=a(243),S=a(244),w=a(245),k=function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={open:!1},e.handleClickOpen=function(){e.setState({open:!0})},e.handleClose=function(){e.setState({open:!1})},e.handleSubmit=function(){e.props.valid?e.props.handleLogin():e.handleClickOpen()},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return Object(n.jsx)("section",{className:"login",children:Object(n.jsxs)("div",{className:"loginContainer",style:{marginTop:"10%"},children:[Object(n.jsx)("h1",{children:"Log In"}),Object(n.jsx)("label",{children:"Email"}),Object(n.jsx)("input",{type:"text",autoFocus:!0,required:!0,value:this.props.email,onChange:function(t){return e.props.setEmail(t.target.value)}}),Object(n.jsx)("label",{children:"Password"}),Object(n.jsx)("input",{type:"password",required:!0,value:this.props.password,onChange:function(t){return e.props.setPassword(t.target.value)}}),Object(n.jsx)("p",{}),Object(n.jsx)(m.b,{to:"/forgot-password",children:"Forgot your password?"}),Object(n.jsxs)("div",{className:"btnContainer",children:[Object(n.jsx)("button",{onClick:this.handleSubmit,children:"Log In"}),Object(n.jsxs)("p",{children:["Not a Member yet?",Object(n.jsx)("span",{children:Object(n.jsx)(m.b,{to:"/email-confirmation",children:"Sign Up"})})]})]}),Object(n.jsxs)(x.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(n.jsx)(v.a,{id:"alert-dialog-title",children:"Forget anything?"}),Object(n.jsx)(y.a,{children:Object(n.jsx)(C.a,{id:"alert-dialog-description",children:"Please fill in all the required fields."})}),Object(n.jsx)(S.a,{children:Object(n.jsx)(w.a,{onClick:this.handleClose,color:"primary",autoFocus:!0,children:"Absolutely!"})})]})]})})}}]),a}(s.Component),N=(a(140),a(26)),P=a.n(N),I=a(40),A=a.n(I),T=function(e,t){return{type:"LOGIN",payload:{userID:e,email:t}}},E=function(e,t){return{type:"SIGNUP",payload:{userID:e,email:t}}},L=function(){return{type:"LOGOUT"}},D=function(e){return{type:"SETEMAIL",payload:e}},F=function(e,t,a,n){return{type:"SETNEWPROFILE",payload:{id:e,color:t,animal:a,age:n}}},q=function(e){return{type:"SETPROFILES",payload:e}},R=function(e){return{type:"SETCURRENTPROFILE",payload:e}},z=function(e,t){return{type:"SETACTIVESTORY",payload:{id:e,title:t}}},W=a(29),B=a(28),U=a(246),G=function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={userID:e.props.cookies.get("userID")||"",email:"",password:"",valid:!1},e.setEmail=function(t){e.validateEmail(t)?e.setState({email:t,valid:!0}):e.setState({email:t,valid:!1})},e.setPassword=function(t){""!==t&&e.validateEmail(e.state.email)?e.setState({password:t,valid:!0}):e.setState({password:t,valid:!1})},e.clearInputs=function(){e.setState({email:"",password:""})},e.validateEmail=function(){return!!/^[a-zA-Z0-9\.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z0-9]+$/.test(e.state.email)},e.validatePassword=function(e){return e.length>0},e.handleLogin=function(){P()({method:"post",url:"/server/user/login",data:A.a.stringify({username:e.state.email,password:e.state.password}),headers:{"content-type":"application/x-www-form-urlencoded;charset=utf-8"}}).then((function(t){console.log(t.headers),200===t.status&&"success"===t.data.message&&(e.props.login(t.data.userID,e.state.email),e.props.cookies.set("userID",t.data.userID,{path:"/",maxAge:86400}),e.props.history.push("/profile"))}))},e.setValid=function(t){e.setState({valid:t})},e.handleLogout=function(){P.a.post("",{}).then((function(e){})),e.props.cookies.remove("userID"),console.log("Log out")},e}return Object(d.a)(a,[{key:"render",value:function(){return"undefined"===this.props.cookies.get("userID")||void 0===this.props.cookies.get("userID")||""===this.props.cookies.get("userID")?Object(n.jsx)("div",{className:"LoginPage",children:Object(n.jsx)(k,{email:this.state.email,setEmail:this.setEmail,password:this.state.password,setPassword:this.setPassword,handleLogin:this.handleLogin,validateEmail:this.validateEmail,valid:this.state.valid,setValid:this.setValid})}):Object(n.jsx)(c.a,{to:"/profile"})}}]),a}(s.Component),M=Object(W.b)((function(e){return{userID:e.userInfo.userID}}),(function(e){return Object(B.a)({login:T},e)}))(Object(U.a)(G)),Q=a(46),Z=a(247),H=a(256),V=(a(161),function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={question1:!1,question2:!1,valid:!1,open:!1},e.componentDidUpdate=function(t,a){!1===a.valid&&e.state.question1&&e.state.question2&&e.setState({valid:!0})},e.handleClickOpen=function(){e.setState({open:!0})},e.handleClose=function(){e.setState({open:!1})},e.handleQuestion1=function(){e.setState({question1:!e.state.question1})},e.handleQuestion2=function(){e.setState({question2:!e.state.question2})},e.handleSubmit=function(){if(e.state.valid)return e.props.setAsked(!0),e.props.history.push("/signup");e.handleClickOpen()},e}return Object(d.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"sec-checkup-container",style:{margin:20,padding:10},children:[Object(n.jsx)(p.a,{className:"sec-checkup-header",children:"Sign up Security Check"}),Object(n.jsx)("form",{children:Object(n.jsxs)(Z.a,{container:!0,style:{paddingTop:15},children:[Object(n.jsxs)(Z.a,{item:!0,xs:12,style:{paddingBottom:10,margin:30,fontSize:30},children:["I have a child between 7 - 9 years of age who is interested in ReadPal",Object(n.jsx)(H.a,{required:!0,checked:this.state.question1,color:"primary",onChange:this.handleQuestion1})]}),Object(n.jsxs)(Z.a,{item:!0,xs:12,style:{paddingBottom:30,margin:30,fontSize:30},children:["I am the parent, legal guardian or educational organization of that child",Object(n.jsx)(H.a,{required:!0,checked:this.state.question2,color:"primary",onChange:this.handleQuestion2})]})]})}),Object(n.jsx)("button",{onClick:this.handleSubmit,id:"proceed-btn",children:"Proceed"}),Object(n.jsxs)(x.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(n.jsx)(v.a,{id:"alert-dialog-title",children:"Forget anything?"}),Object(n.jsx)(y.a,{children:Object(n.jsx)(C.a,{id:"alert-dialog-description",children:"Please Answer All The Questions!"})}),Object(n.jsx)(S.a,{children:Object(n.jsx)(w.a,{onClick:this.handleClose,color:"primary",autoFocus:!0,children:"Absolutely!"})})]})]})}}]),a}(s.Component)),Y=Object(c.h)(V),J=a(115),_=function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return Object(n.jsx)("section",{className:"signup",children:Object(n.jsxs)("div",{className:"signupContainer",style:{marginTop:"10%"},children:[Object(n.jsx)("h1",{children:"Sign Up"}),Object(n.jsx)("label",{children:"Enter the OTP code we sent you via email"}),Object(n.jsx)("input",{type:"text",autoFocus:!0,required:!0,placeholder:"6 digit code",value:this.props.otp,onChange:function(t){return e.props.setOtp(t.target.value)}}),Object(n.jsx)("label",{children:"Password"}),Object(n.jsx)("input",{type:"password",required:!0,value:this.props.password,onChange:function(t){return e.props.setPassword(t.target.value)}}),Object(n.jsx)("label",{children:"First Name"}),Object(n.jsx)("input",{type:"text",autoFocus:!0,required:!0,value:this.props.firstname,onChange:function(t){return e.props.setFirstname(t.target.value)}}),Object(n.jsx)("label",{children:"Last Name"}),Object(n.jsx)("input",{type:"text",required:!0,value:this.props.lastname,onChange:function(t){return e.props.setLastname(t.target.value)}}),Object(n.jsx)("label",{children:"Organization"}),Object(n.jsx)("input",{type:"text",placeholder:"optional",value:this.props.organization,onChange:function(t){return e.props.setOrganization(t.target.value)}}),Object(n.jsx)("label",{children:"Country"}),Object(n.jsx)(J.a,{id:"country-dropdown",value:this.props.country,onChange:function(t){return e.props.setCountry(t)}}),Object(n.jsxs)("div",{children:[Object(n.jsx)("p",{style:{fontSize:22,display:"inline-block"},children:"I agree to the terms of services"}),Object(n.jsx)(H.a,{required:!0,checked:this.props.checked,color:"primary",onChange:function(){return e.props.setChecked(!e.props.checked)},style:{display:"inline-block"}})]}),Object(n.jsx)("div",{className:"btnContainer",children:Object(n.jsx)("button",{onClick:this.props.handleSignup,children:"Sign Up"})})]})})}}]),a}(s.Component);a(162);var $=Object(W.b)((function(e){return{email:e.userInfo.email}}),(function(e){return Object(B.a)({signup:E},e)}))((function(e){var t=Object(c.g)(),a=Object(s.useState)(!1),r=Object(Q.a)(a,2),i=r[0],o=r[1],l=Object(s.useState)(""),d=Object(Q.a)(l,2),u=d[0],j=d[1],h=Object(s.useState)(""),p=Object(Q.a)(h,2),b=p[0],O=p[1],g=Object(s.useState)(""),m=Object(Q.a)(g,2),f=m[0],k=m[1],N=Object(s.useState)(""),I=Object(Q.a)(N,2),T=I[0],E=I[1],L=Object(s.useState)(""),D=Object(Q.a)(L,2),F=D[0],q=D[1],R=Object(s.useState)(""),z=Object(Q.a)(R,2),W=z[0],B=z[1],U=Object(s.useState)(!1),G=Object(Q.a)(U,2),M=G[0],Z=G[1],H=Object(s.useState)(!1),V=Object(Q.a)(H,2),J=V[0],$=V[1],K=function(){$(!1)};return Object(n.jsxs)("div",{className:"SignupPage",children:[i?Object(n.jsx)(_,{firstname:u,lastname:b,organization:f,country:T,otp:F,password:W,setOtp:q,setLastname:O,setFirstname:j,setOrganization:k,setCountry:E,setPassword:B,handleSignup:function(){if(M){var a={otp:F,email:e.email,password:W,firstname:u,lastname:b,organization:f,country:T};P()({method:"post",url:"/server/user/register",data:A.a.stringify(a),headers:{"content-type":"application/x-www-form-urlencoded;charset=utf-8"}}).then((function(a){console.log(a),200===a.status&&"success"===a.data.message&&(e.signup(a.data.userID,e.email),t.push("/child-profile-form"))}))}else $(!0)},checked:M,setChecked:Z}):Object(n.jsx)(Y,{setAsked:o}),Object(n.jsxs)(x.a,{open:J,onClose:K,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(n.jsx)(v.a,{id:"alert-dialog-title",children:"Forget anything?"}),Object(n.jsx)(y.a,{children:Object(n.jsx)(C.a,{id:"alert-dialog-description",children:"Please Agree the Terms and Services!"})}),Object(n.jsx)(S.a,{children:Object(n.jsx)(w.a,{onClick:K,color:"primary",autoFocus:!0,children:"Close"})})]})]})})),K=a(254),X=(a(163),["7","8","9"]),ee=["Blue","Red","Green","Pink","Purple","Orange","Yellow"],te=["Dog","Cat","Horse","Rabbit","Dolphin","Bear","Kangaroo","Lion","Tiger","Bird"],ae=function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={age:"",color:"",animal:"",valid:!1,open:!1},e.componentDidUpdate=function(t,a){!1===a.valid&&""!==e.state.age&&""!==e.state.color&&""!==e.state.animal&&e.setState({valid:!0})},e.handleClickOpen=function(){e.setState({open:!0})},e.handleClose=function(){e.setState({open:!1})},e.handleAge=function(t){e.setState({age:t.target.value})},e.handleColor=function(t){e.setState({color:t.target.value})},e.handleAnimal=function(t){e.setState({animal:t.target.value})},e.handleSubmit=function(){if(e.state.valid){var t={age:e.state.age,color:e.state.color,animal:e.state.animal};P()({method:"post",url:"/server/user/".concat(e.props.userID,"/profile"),data:A.a.stringify(t),headers:{"content-type":"application/x-www-form-urlencoded;charset=utf-8"}}).then((function(t){(t.data.message="success")&&(e.props.setNewProfile(t.data.profileID,e.state.color,e.state.animal,e.state.age),e.props.history.push("/congrats"))}))}else e.handleClickOpen()},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{style:{margin:20,padding:10},children:[Object(n.jsx)(p.a,{className:"readpal-header",children:"Welcome to ReadPal"}),Object(n.jsx)(p.a,{className:"greetings-header",children:"To begin, tell us about yourself."}),Object(n.jsx)("form",{children:Object(n.jsxs)(Z.a,{container:!0,style:{paddingTop:15},children:[Object(n.jsxs)(Z.a,{item:!0,xs:12,style:{paddingBottom:10},children:[Object(n.jsx)(p.a,{children:"How old are you?"}),X.map((function(t){return Object(n.jsxs)(r.a.Fragment,{children:[Object(n.jsx)(K.a,{value:t,checked:e.state.age===t,color:"primary",onChange:e.handleAge}),t,Object(n.jsx)("br",{})]})}))]}),Object(n.jsxs)(Z.a,{item:!0,xs:12,style:{paddingBottom:10},children:[Object(n.jsx)(p.a,{children:"What is your favourite color?"}),ee.map((function(t){return Object(n.jsxs)(r.a.Fragment,{children:[Object(n.jsx)(K.a,{value:t,checked:e.state.color===t,color:"primary",onChange:e.handleColor}),t,Object(n.jsx)("br",{})]})}))]}),Object(n.jsxs)(Z.a,{item:!0,xs:12,style:{paddingBottom:10},children:[Object(n.jsx)(p.a,{children:"What is your favourite animal?"}),te.map((function(t){return Object(n.jsxs)(r.a.Fragment,{children:[Object(n.jsx)(K.a,{value:t,checked:e.state.animal===t,color:"primary",onChange:e.handleAnimal}),t,Object(n.jsx)("br",{})]})}))]})]})}),Object(n.jsx)("button",{onClick:this.handleSubmit,children:"Submit"}),Object(n.jsxs)(x.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(n.jsx)(v.a,{id:"alert-dialog-title",children:"Forget anything?"}),Object(n.jsx)(y.a,{children:Object(n.jsx)(C.a,{id:"alert-dialog-description",children:"Please Answer All The Questions!"})}),Object(n.jsx)(S.a,{children:Object(n.jsx)(w.a,{onClick:this.handleClose,color:"primary",autoFocus:!0,children:"Absolutely!"})})]})]})}}]),a}(s.Component),ne=Object(W.b)((function(e){return{userID:e.userInfo.userID}}),(function(e){return Object(B.a)({setNewProfile:F},e)}))(Object(c.h)(ae)),se=(a(164),a.p+"static/media/green_lion.39976864.jpg"),re=Object(W.b)((function(e){return{newProfile:e.userInfo.yourChildren[0]}}))((function(e){return Object(n.jsxs)("div",{className:"profile-done-block",children:[Object(n.jsx)(p.a,{className:"profile-congrat-header",children:"Congratulations,"}),Object(n.jsxs)(p.a,{className:"profile-congrat-text",children:[e.newProfile.color," ",e.newProfile.animal,"!"]}),Object(n.jsx)("img",{src:se,alt:"icon",style:{width:300,height:300,padding:0,margin:0}}),Object(n.jsxs)(p.a,{className:"profile-greetings-text",children:["Your unique profile ID number is:",Object(n.jsx)(p.a,{style:{fontWeight:"bold",fontSize:25,color:e.newProfile.color},children:e.newProfile.id}),"PLEASE WRITE THIS DOWN"]}),Object(n.jsx)("div",{children:Object(n.jsx)(m.b,{to:"/",children:Object(n.jsx)("button",{id:"profile-congrat-enter-btn",children:"Enter Home"})})}),Object(n.jsx)("div",{children:Object(n.jsx)(m.b,{to:"/child-profile-form",children:Object(n.jsx)("button",{id:"profile-congrat-create-btn",children:"Create Another Child Profile"})})})]})})),ie=(a(165),function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={email:""},e.handleConfirm=function(){P()({method:"post",url:"/server/user/verify",data:A.a.stringify({email:e.state.email}),headers:{"content-type":"application/x-www-form-urlencoded;charset=utf-8"}}).then((function(t){console.log(t),200===t.status&&"success"===t.data.message&&(e.props.changeEmail(e.state.email),e.props.history.push("/signup"))}))},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return Object(n.jsx)("section",{className:"email-confirm",children:Object(n.jsxs)("div",{className:"email-confirmContainer",style:{marginTop:"10%"},children:[Object(n.jsx)("h1",{children:"Sign Up"}),Object(n.jsx)("label",{children:"Enter your email address"}),Object(n.jsx)("input",{type:"text",required:!0,value:this.state.email,onChange:function(t){return e.setState({email:t.target.value})}}),Object(n.jsx)("div",{className:"btnContainer",children:Object(n.jsx)("button",{onClick:this.handleConfirm,children:"Register"})})]})})}}]),a}(s.Component)),oe=Object(W.b)((function(e){return{}}),(function(e){return Object(B.a)({changeEmail:D},e)}))(ie),ce=(a(166),function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={email:"",password:"",otp:"",open:!1,next:!1,validStep1:!1,validStep2:!1},e.handleClickOpen=function(){e.setState({open:!0})},e.handleClose=function(){e.setState({open:!1})},e.componentDidUpdate=function(t,a){!a.validStep1&&e.validateEmail(e.state.email)&&(console.log(e.state.email),e.setState({validStep1:!0})),a.validStep2||""===e.state.otp||""===e.state.password||e.setState({validStep2:!0})},e.handleSubmit=function(){e.state.validStep1?P()({method:"post",url:"/server/user/forgot",data:A.a.stringify({email:e.state.email}),headers:{"content-type":"application/x-www-form-urlencoded;charset=utf-8"}}).then((function(t){console.log(t),200===t.status&&"success"===t.data.message&&e.setState({next:!0})})):e.handleClickOpen()},e.handleReset=function(){e.state.validStep2?P()({method:"patch",url:"/server/user/reset",data:A.a.stringify({otp:e.state.otp,password:e.state.password}),headers:{"content-type":"application/x-www-form-urlencoded;charset=utf-8"}}).then((function(t){console.log(t),200===t.status&&"success"===t.data.message&&e.props.history.push("/login")})):e.handleClickOpen()},e.validateEmail=function(){return!!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(e.state.email)},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return Object(n.jsxs)(r.a.Fragment,{children:[this.state.next?Object(n.jsx)("section",{className:"forgotPassword",children:Object(n.jsxs)("div",{className:"forgotPasswordContainer",style:{marginTop:"10%"},children:[Object(n.jsx)("h1",{children:"Reset Password"}),Object(n.jsx)("label",{children:"Enter the 6-digit code we sent you via Email"}),Object(n.jsx)("input",{type:"text",autoFocus:!0,required:!0,value:this.state.otp,onChange:function(t){return e.setState({otp:t.target.value})}}),Object(n.jsx)("label",{children:"Password"}),Object(n.jsx)("input",{type:"password",required:!0,value:this.state.password,onChange:function(t){return e.setState({password:t.target.value})}}),Object(n.jsx)("div",{className:"btnContainer",children:Object(n.jsx)("button",{onClick:this.handleReset,children:"Reset"})})]})}):Object(n.jsx)("section",{className:"forgotPassword",children:Object(n.jsxs)("div",{className:"forgotPasswordContainer",style:{marginTop:"10%"},children:[Object(n.jsx)("h1",{children:"Reset Password"}),Object(n.jsx)("label",{children:"Enter your registered Email Address"}),Object(n.jsx)("input",{type:"text",autoFocus:!0,required:!0,value:this.state.email,onChange:function(t){return e.setState({email:t.target.value})}}),Object(n.jsx)("div",{className:"btnContainer",children:Object(n.jsx)("button",{onClick:this.handleSubmit,children:"Submit"})})]})}),Object(n.jsxs)(x.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(n.jsx)(v.a,{id:"alert-dialog-title",children:"Forget anything?"}),Object(n.jsx)(y.a,{children:Object(n.jsx)(C.a,{id:"alert-dialog-description",children:"Please fill in all the required fields."})}),Object(n.jsx)(S.a,{children:Object(n.jsx)(w.a,{onClick:this.handleClose,color:"primary",autoFocus:!0,children:"Absolutely!"})})]})]})}}]),a}(s.Component)),le=(a(167),function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={userID:e.props.cookies.get("userID")||""},e.getProfiles=function(){P.a.get("/server/user/".concat(e.state.userID,"/profiles")).then((function(t){"success"===t.data.message&&e.props.setProfiles(t.data.profiles)}))},e.handleLogout=function(){P.a.get("/server/user/logout").then((function(t){"success"===t.data.message&&(e.props.logout(),e.props.cookies.remove("userID"),e.props.cookies.remove("profileID"),e.props.history.push("/login"))}))},e.handleChooseProfile=function(t){e.props.setCurrentProfile(t),e.props.cookies.set("profileID",t,{path:"/",maxAge:86400})},e.componentDidMount=function(){e.getProfiles()},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return""===this.state.userID?Object(n.jsx)(c.a,{to:"/login"}):Object(n.jsxs)("div",{className:"profile-home-block",children:[Object(n.jsx)(p.a,{className:"profile-home-header",children:"Please select who is reading today"}),Object(n.jsx)("hr",{style:{width:"66%",margin:"auto",padding:30}}),this.props.childrenProfile.map((function(t,a){return Object(n.jsx)("div",{id:a,style:{border:"1px solid grey",borderRadius:20,width:500,margin:"auto",marginBottom:40},children:Object(n.jsxs)(m.b,{to:"/library",onClick:function(){return e.handleChooseProfile(t._id)},children:[Object(n.jsxs)(p.a,{className:"profile-home-id-text",style:{fontWeight:"bold",fontSize:25,color:t.color,marginTop:20},children:["ID: ",t._id]}),Object(n.jsx)("img",{src:"data:image/jpeg;base64,".concat(t.icon),alt:"icon",style:{width:300,height:300,padding:0,margin:0},onClick:function(){return e.props.setCurrentProfile(t)}})]})})})),Object(n.jsx)("div",{children:Object(n.jsx)(m.b,{to:"/child-profile-form",children:Object(n.jsx)("button",{id:"profile-home-create-btn",children:"Create Another Child Profile"})})}),Object(n.jsx)("div",{children:Object(n.jsx)("button",{id:"profile-home-logout-btn",onClick:this.handleLogout,children:"Log out"})})]})}}]),a}(s.Component)),de=Object(W.b)((function(e){return{childrenProfile:e.userInfo.yourChildren,userID:e.userInfo.userID}}),(function(e){return Object(B.a)({setProfiles:q,setCurrentProfile:R,logout:L},e)}))(Object(U.a)(le)),ue=a(248),je=a(249),he=a(250),pe=a(251),be=(a(168),a.p+"static/media/children.4545a2d3.jpg");function Oe(e){var t=e.handleOpen,a=e.open,s=e.story,r=e.handleChooseStory;return Object(n.jsxs)(x.a,{open:a,onClose:function(){return t(!1)},maxWidth:"lg",children:[Object(n.jsx)(v.a,{children:Object(n.jsx)(p.a,{variant:"h3",children:s.title})}),Object(n.jsxs)(y.a,{children:[Object(n.jsxs)(p.a,{style:{fontSize:25},children:["Author: ",s.author]}),Object(n.jsxs)(p.a,{style:{fontSize:25},children:["Pages: ",s.pages]}),Object(n.jsx)("img",{src:be,alt:"thumbnail",style:{width:200,height:200,margin:20}}),Object(n.jsx)("div",{style:{fontSize:20,marginTop:15},children:s.description})]}),Object(n.jsxs)(S.a,{children:[Object(n.jsx)(w.a,{variant:"primary",onClick:function(){return t(!1)},children:"Back"}),Object(n.jsx)(w.a,{variant:"primary",onClick:function(){return r(s.title)},children:"Read"}),Object(n.jsx)(w.a,{variant:"primary",children:"Find Friends"})]})]})}var ge=function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={titles:[],open:!1,chosenStory:{title:"",description:"",author:"",ages:[""]}},e.getTitles=function(){P.a.get("/server/library/titles").then((function(t){"success"===t.data.message&&e.setState({titles:t.data.stories})}))},e.handleChooseStory=function(t){e.props.setActiveStory(t),e.props.cookies.set("activeStory",t,{path:"/",maxAge:86400}),e.props.history.push("/read-story")},e.handleOpen=function(t){e.setState({open:t})},e.handlePreview=function(t){e.setState({open:!0,chosenStory:t})},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.getTitles()}},{key:"render",value:function(){var e=this;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(p.a,{className:"library-page-header",variant:"h2",children:"Library"}),Object(n.jsx)("div",{className:"library-page-block",children:Object(n.jsx)(ue.a,{sx:{width:"100%",maxWidth:360,bgcolor:"background.paper"},children:this.state.titles.map((function(t,a){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(je.a,{alignItems:"flex-start",onClick:function(){e.handlePreview(t)},style:{cursor:"pointer"},className:"lib-story",children:Object(n.jsx)(he.a,{primary:"Title: ".concat(t.title),secondary:Object(n.jsxs)(r.a.Fragment,{children:[Object(n.jsxs)(p.a,{component:"span",variant:"body1",color:"text.primary",style:{fontStyle:"italic",marginBottom:10},children:["Author: ",t.author]}),Object(n.jsxs)(p.a,{variant:"body1",children:["Pages: ",t.pages]}),Object(n.jsxs)(p.a,{variant:"body1",children:["Ages: ",t.ages[0]," and ",t.ages[1]]})]})})}),Object(n.jsx)(pe.a,{variant:"inset",component:"li"})]})}))})}),Object(n.jsx)(Oe,{handleOpen:this.handleOpen,open:this.state.open,story:this.state.chosenStory,handleChooseStory:this.handleChooseStory})]})}}]),a}(s.Component),me=Object(W.b)((function(e){return{}}),(function(e){return Object(B.a)({setActiveStory:z},e)}))(Object(U.a)(ge)),fe=a(64),xe=a(253),ve=a(119),ye=a.n(ve),Ce=a(118),Se=a.n(Ce),we=a(117),ke=a.n(we),Ne=(a(199),a(116)),Pe=a.n(Ne);fe.c.GlobalWorkerOptions.workerSrc="//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(fe.c.version,"/pdf.worker.js");var Ie=function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={numPages:null,pageNumber:1,prevAvailable:!1,nextAvailable:!1,tempPageNo:1,file:null,isLoading:!0},e.onDocumentLoadSuccess=function(t){var a=t.numPages;a>1?e.setState({numPages:a,nextAvailable:!0}):e.setState({numPages:a})},e.goToPrevPage=function(){e.state.pageNumber-1===1?e.setState((function(e){return{pageNumber:e.pageNumber-1,prevAvailable:!1,nextAvailable:!0}})):e.setState((function(e){return{pageNumber:e.pageNumber-1,nextAvailable:!0}}))},e.goToNextPage=function(){e.state.pageNumber+1===e.state.numPages?e.setState((function(e){return{pageNumber:e.pageNumber+1,nextAvailable:!1,prevAvailable:!0}})):e.setState((function(e){return{pageNumber:e.pageNumber+1,prevAvailable:!0}}))},e.goToPage=function(){e.state.tempPageNo>0&&e.state.tempPageNo<=e.state.numPages?e.setState({pageNumber:e.state.tempPageNo}):console.log("Invalid")},e.handleChange=function(t){if(""!==t.target.value){var a=t.target.value;isNaN(a)||(a=parseInt(a),e.setState({tempPageNo:a}))}},e.componentDidUpdate=function(t,a){if(a.pageNumber!==e.state.pageNumber){var n=!1,s=!1;e.state.pageNumber>1&&e.state.pageNumber<e.state.numPages?(n=!0,s=!0):e.state.pageNumber<=1?s=!0:e.state.pageNumber>=e.state.numPages&&(n=!0),e.setState({prevAvailable:n,nextAvailable:s})}},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;P()({method:"GET",url:"/server/library/story",params:{title:this.props.title},responseType:"blob"}).then((function(t){var a=new Blob([t.data],{type:"application/pdf"});e.setState({file:a,isLoading:!1})}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.pageNumber,s=t.numPages;return this.state.isLoading?Object(n.jsxs)("div",{className:"pdf-display-loading",children:[Object(n.jsx)("h1",{children:"Loading story"}),Object(n.jsx)(Pe.a,{size:100})]}):Object(n.jsxs)("div",{className:"pdf-display-container",children:[Object(n.jsx)("div",{children:Object(n.jsxs)(w.a,{variant:"outlined",color:"secondary",onClick:this.props.backToLibrary,style:{width:210,margin:25},children:[Object(n.jsx)(ke.a,{style:{marginRight:10}}),"Back to Library"]})}),Object(n.jsx)("h3",{children:this.props.title}),Object(n.jsx)(fe.a,{file:this.state.file,onLoadSuccess:this.onDocumentLoadSuccess,children:Object(n.jsx)(fe.b,{pageNumber:a})}),Object(n.jsxs)("p",{className:"page-info",children:["Page ",a," of ",s]}),Object(n.jsxs)("div",{children:[Object(n.jsx)(xe.a,{id:"standard-basic",label:"Jump To",placeholder:"Ex: 1",onChange:function(t){return e.handleChange(t)},style:{maxWidth:80,maxHeight:30}}),Object(n.jsx)("span",{children:Object(n.jsx)(w.a,{onClick:this.goToPage,style:{maxWidth:40,marginTop:10},children:"Go!"})}),Object(n.jsxs)("span",{className:"prev-next-block",children:[this.state.prevAvailable?Object(n.jsxs)(w.a,{variant:"outlined",color:"primary",onClick:this.goToPrevPage,style:{maxWidth:175,marginLeft:"5%"},children:[Object(n.jsx)(Se.a,{}),"Previous Page"]}):Object(n.jsx)(n.Fragment,{}),this.state.nextAvailable?Object(n.jsxs)(w.a,{variant:"outlined",color:"primary",disabled:!this.state.nextAvailable,onClick:this.goToNextPage,style:{maxWidth:175,marginLeft:"5%"},children:["Next Page",Object(n.jsx)(ye.a,{})]}):Object(n.jsx)(n.Fragment,{})]})]})]})}}]),a}(s.Component),Ae=function(e){Object(u.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={title:e.props.cookies.get("activeStory")||""},e.backToLibrary=function(){e.props.history.push("/library")},e}return Object(d.a)(a,[{key:"render",value:function(){return Object(n.jsx)(Ie,{title:this.state.title,backToLibrary:this.backToLibrary})}}]),a}(s.Component),Te=Object(W.b)((function(e){return{title:e.userInfo.activeStory.title}}))(Object(U.a)(Ae)),Ee=(a(108),function(e){var t=0;return Object(n.jsxs)("div",{className:"card text-center shadow",children:[Object(n.jsx)("div",{className:"overflow",children:Object(n.jsx)("img",{src:e.imgsrc,alt:"children",className:"card-img-top"})}),Object(n.jsxs)("div",{className:"card-body text-dark",children:[Object(n.jsx)("h1",{className:"card-title",children:e.header}),Object(n.jsx)("ul",{className:"list-unstyled card-text text-secodary",children:e.content.map((function(e){return Object(n.jsx)("li",{children:e},t++)}))}),Object(n.jsxs)("div",{children:[Object(n.jsx)("span",{className:"price-span",children:e.price}),Object(n.jsx)("span",{className:"period-span",children:"Per month"})]}),Object(n.jsx)("a",{href:"/",className:"btn btn-outline-success",children:"Subcribe"})]})]})}),Le=(s.Component,a(205),function(){return Object(n.jsxs)(c.d,{children:[Object(n.jsx)(c.b,{path:"/login",exact:!0,component:M}),Object(n.jsx)(c.b,{path:"/signup",exact:!0,component:$}),Object(n.jsx)(c.b,{path:"/child-profile-form",exact:!0,component:ne}),Object(n.jsx)(c.b,{path:"/congrats",exact:!0,component:re}),Object(n.jsx)(c.b,{path:"/email-confirmation",exact:!0,component:oe}),Object(n.jsx)(c.b,{path:"/forgot-password",exact:!0,component:ce}),Object(n.jsx)(c.b,{path:"/profile",exact:!0,component:de}),Object(n.jsx)(c.b,{path:"/library",exact:!0,component:me}),Object(n.jsx)(c.b,{path:"/read-story",exact:!0,component:Te}),Object(n.jsx)(c.b,{path:"/",exact:!0,component:f})]})});a(206);var De=function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)(Le,{})})},Fe=(a(207),a(120)),qe=a(30),Re={userID:"",email:"",currentProfile:{},yourChildren:[],friends:[],activeStory:{}},ze=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":case"SIGNUP":return Object(qe.a)(Object(qe.a)({},e),{},{userID:t.payload.userID,email:t.payload.email});case"SETEMAIL":return Object(qe.a)(Object(qe.a)({},e),{},{email:t.payload});case"SETNEWPROFILE":return Object(qe.a)(Object(qe.a)({},e),{},{yourChildren:[].concat(Object(Fe.a)(e.yourChildren),[t.payload])});case"SETPROFILES":return Object(qe.a)(Object(qe.a)({},e),{},{yourChildren:t.payload});case"SETCURRENTPROFILE":return Object(qe.a)(Object(qe.a)({},e),{},{currentProfile:t.payload});case"SETACTIVESTORY":return Object(qe.a)(Object(qe.a)({},e),{},{activeStory:t.payload});case"LOGOUT":return Re;default:return e}},We=Object(B.b)({userInfo:ze}),Be=a(252),Ue=Object(B.c)(We);o.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(Be.a,{children:Object(n.jsx)(W.a,{store:Ue,children:Object(n.jsx)(m.a,{children:Object(n.jsx)(De,{})})})})}),document.getElementById("root"))},80:function(e,t,a){}},[[208,1,2]]]);
//# sourceMappingURL=main.8560b465.chunk.js.map