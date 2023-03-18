package com.ft.modumoa.config.jwt;

import com.ft.modumoa.config.auth.PrincipalDetails;
import com.ft.modumoa.config.auth.PrincipalDetailsService;
import com.ft.modumoa.entity.User;
import com.ft.modumoa.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.security.sasl.AuthenticationException;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;


@AllArgsConstructor
public class JwtAuthenticationFilter implements Filter {

    private final PrincipalDetailsService principalDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String bearer = req.getHeader(HttpHeaders.AUTHORIZATION);

        if (bearer == null || !bearer.startsWith(JwtProperties.TOKEN_PREFIX)) {

            chain.doFilter(request, response);
        } else {

            String jwtToken = bearer.substring(JwtProperties.TOKEN_PREFIX.length());
            VerifyResult result = jwtUtil.verifyToken(jwtToken);
            System.out.println(result);
            if (result.isSuccess()) {

                PrincipalDetails user = (PrincipalDetails) principalDetailsService.loadUserByUsername(result.getUsername());

                System.out.println("인증 성공. user : " + result.getUsername());

                Authentication authentication = getAuthentication(result);
                SecurityContext context = SecurityContextHolder.getContext();
                context.setAuthentication(authentication);

                chain.doFilter(request, response);

            } else {
                throw new AuthenticationException("TOKEN is not valid");
            }
        }
    }

    private Authentication getAuthentication(VerifyResult result) {

        User user = userRepository.findByIntraId(result.getUsername());
        Set<GrantedAuthority> roles = new HashSet<>();
        roles.add(new SimpleGrantedAuthority("ROLE_USER"));

        return new UsernamePasswordAuthenticationToken(new PrincipalDetails(user), null, roles);
    }

}
