package com.bfn.client.web;

import com.bfn.client.BFNAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    private static final Logger LOGGER = LoggerFactory.getLogger(BFNAuthenticationFilter.class);

    @Bean
    public FilterRegistrationBean<BFNAuthenticationFilter> filterRegistrationBean() {
        LOGGER.info("\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 FilterRegistrationBean: filterRegistrationBean()");
        FilterRegistrationBean <BFNAuthenticationFilter> registrationBean = new FilterRegistrationBean <BFNAuthenticationFilter>();
        BFNAuthenticationFilter customURLFilter = new BFNAuthenticationFilter();

        registrationBean.setFilter(customURLFilter);
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(2); //set precedence

        LOGGER.info("\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 FilterRegistrationBean: bean has ORDER =  "
        + registrationBean.getOrder());
        return registrationBean;
    }
}

