package com.bfn.client;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

@Component
public class MyFilter extends OncePerRequestFilter {
    public MyFilter() {
        System.out.println("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 " +
                "MyFilter which extends OncePerRequestFilter: constructor \uD83D\uDE21");
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(MyFilter.class);

    @Value("${spring.profiles.active}")
    private String profile = "dev";


    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest httpServletRequest,
                                    @NotNull HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        System.out.println("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 Request URI is: " + httpServletRequest.getRequestURI());
        System.out.println("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 Request URI is: " + httpServletRequest.getPathInfo());

        print(httpServletRequest);
        if (profile != null) {
            if (profile.equalsIgnoreCase("dev")) {
                //check authorization token
                String m = httpServletRequest.getHeader("Authorization");
                if (m == null) {
                    String msg =  "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                            "Authorization Header is missing. Needs token! \uD83C\uDF4E " ;
                    System.out.println(msg);
                    throw new ServletException( msg);
                }
                String token = m.substring(7);
                System.out.println("\uD83D\uDD37 \uD83D\uDD37 \uD83D\uDD37 token to verify: " + token);
                try {
                    FirebaseToken mToken = FirebaseAuth.getInstance().verifyIdToken(token, true);
                    System.out.println("\uD83D\uDE21 FirebaseToken returned, uid: "
                            + mToken.getUid() + " \uD83D\uDE21 email: " + mToken.getEmail()
                            + "  \uD83C\uDF38 isEmailVerified: " + mToken.isEmailVerified() + "  \uD83C\uDF38" +
                            " - going on to do the filter - \uD83C\uDF4E request has been authenticated OK \uD83C\uDF4E");
                    doFilter(httpServletRequest, httpServletResponse, filterChain);

                } catch (FirebaseAuthException e) {
                    String msg =  "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                            "FirebaseAuthException happened: \uD83C\uDF4E " + e.getMessage();
                    System.out.println(msg);
                    throw new ServletException( msg);
                }
            } else {
                System.out.println("\uD83D\uDC9A \uD83D\uDC9A \uD83D\uDC9A Dev Mode:  No need to verify token ");
                doFilter(httpServletRequest, httpServletResponse, filterChain);
            }
        } else {
            System.out.println("\uD83D\uDE21 \uD83D\uDE21 Unknown Mode: profile property is null  ");
            doFilter(httpServletRequest, httpServletResponse, filterChain);
        }
    }

    private void doFilter(@NotNull HttpServletRequest httpServletRequest,
                          @NotNull HttpServletResponse httpServletResponse,
                          FilterChain filterChain) throws IOException, ServletException {
        filterChain.doFilter(httpServletRequest, httpServletResponse);
        System.out.println("\uD83D\uDD37 \uD83D\uDD37 \uD83D\uDD37 Response Status Code is: "
                + httpServletResponse.getStatus() + "  \uD83D\uDD37  \uD83D\uDD37");
    }

    private void print(@NotNull HttpServletRequest httpServletRequest) {
        System.out.println("\uD83D\uDE21 \uD83D\uDE21 parameters ...");
        Enumeration<String> parms = httpServletRequest.getParameterNames();
        while (parms.hasMoreElements()) {
            String m = parms.nextElement();
            System.out.println("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 parameterName: " + m);

        }
        System.out.println("\uD83D\uDE21 \uD83D\uDE21 headers ...");
        Enumeration<String> names = httpServletRequest.getHeaderNames();
        while (names.hasMoreElements()) {
            String m = names.nextElement();
            System.out.println("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 headerName: " + m);
        }
        System.out.println("\uD83D\uDC9A\uD83D\uDC9A\uD83D\uDC9A Header: Authorization: "
                + httpServletRequest.getHeader("Authorization") + " \uD83D\uDC9A");
    }

}
