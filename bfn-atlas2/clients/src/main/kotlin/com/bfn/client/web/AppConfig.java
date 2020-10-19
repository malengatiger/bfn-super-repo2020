package com.bfn.client.web;

import com.bfn.client.MyFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    private static final Logger LOGGER = LoggerFactory.getLogger(MyFilter.class);

    @Bean
    public FilterRegistrationBean<MyFilter> filterRegistrationBean() {
        LOGGER.info("\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 FilterRegistrationBean: filterRegistrationBean()");
        FilterRegistrationBean < MyFilter > registrationBean = new FilterRegistrationBean <MyFilter>();
        MyFilter customURLFilter = new MyFilter();

        registrationBean.setFilter(customURLFilter);
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(2); //set precedence

        LOGGER.info("\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 FilterRegistrationBean: bean: "
        + registrationBean.toString());
        return registrationBean;
    }
}

