package com.bfn.client
class SpringSecurityWebAppConfig {

}
//import org.springframework.context.annotation.Configuration
//import org.springframework.security.config.annotation.web.builders.HttpSecurity
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
//
//
//@Configuration
//class SpringSecurityWebAppConfig(disableDefaults: Boolean) : WebSecurityConfigurerAdapter(disableDefaults) {
//
//    @Throws(Exception::class)
//    override fun configure(http: HttpSecurity) {
//        http.authorizeRequests()
//                .antMatchers("/**").permitAll()
//                .antMatchers("/img/**").permitAll()
//                .anyRequest().authenticated()
//    }
//}