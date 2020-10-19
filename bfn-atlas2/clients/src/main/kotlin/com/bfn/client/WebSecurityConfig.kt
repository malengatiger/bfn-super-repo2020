package com.bfn.client
class WebSecurityConfig {
}
//import com.bfn.client.web.DemoDataService
//import com.google.gson.GsonBuilder
//import org.slf4j.LoggerFactory
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.security.config.annotation.web.builders.HttpSecurity
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
//import org.springframework.security.core.userdetails.User
//import org.springframework.security.core.userdetails.UserDetailsService
//import org.springframework.security.provisioning.InMemoryUserDetailsManager
//
//
//@Configuration
//@EnableWebSecurity
//class WebSecurityConfig : WebSecurityConfigurerAdapter() {
//    private val logger = LoggerFactory.getLogger(DemoDataService::class.java)
//    private val gson = GsonBuilder().setPrettyPrinting().create()
//    init {
//        logger.info("${Emo.FLOWER_YELLOW}${Emo.FLOWER_YELLOW} WebSecurityConfig: init  ................")
//    }
//    @Throws(Exception::class)
//    override fun configure(http: HttpSecurity) {
//        logger.info("${Emo.FLOWER_YELLOW}${Emo.FLOWER_YELLOW} WebSecurityConfig: configure  ................")
//        http
//                .authorizeRequests()
////                .antMatchers("/bfn/admin", "/bfn/admin/hello", "/bfn/admin/ping").permitAll()
//                .anyRequest().permitAll()
//                .and()
//                .formLogin()
//                .loginPage("/loginx")
//                .permitAll()
//                .and()
//                .logout()
//                .permitAll()
//    }
//
//    @Bean
//    public override fun userDetailsService(): UserDetailsService {
//        val user = User.withDefaultPasswordEncoder()
//                .username("user")
//                .password("password")
//                .roles("USER")
//                .build()
//        return InMemoryUserDetailsManager(user)
//    }
//}