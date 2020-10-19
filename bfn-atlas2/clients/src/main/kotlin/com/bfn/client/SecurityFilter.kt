package com.bfn.client

import com.bfn.client.web.DemoDataService
import com.google.gson.GsonBuilder
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class SecurityFilter: OncePerRequestFilter() {
    private val logger = LoggerFactory.getLogger(SecurityFilter::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        println("${Emo.HAND2} SecurityFilter:doFilterInternal ${Emo.HAND2} request ${request.contextPath}")

    }
    init {
        println("${Emo.YELLOW_BIRD}\"${Emo.YELLOW_BIRD}\"${Emo.YELLOW_BIRD}" +
                " SecurityFilter:doFilterInternal ${Emo.HAND2}")
    }
}