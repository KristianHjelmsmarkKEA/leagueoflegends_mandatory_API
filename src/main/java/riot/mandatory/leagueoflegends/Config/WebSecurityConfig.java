package riot.mandatory.leagueoflegends.Config;

/* We tried to use security, but could not get it to work properly.
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.inMemoryAuthentication()
                .withUser("basicuser")
                .password(passwordEncoder().encode("basicpassword"))
                .roles("EMPLOYEE")
                .and()
                .withUser("adminuser")
                .password(passwordEncoder().encode("adminpassword"))
                .roles("EMPLOYEE", "ADMIN");

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/").hasRole("ADMIN")
                .antMatchers("/").hasAnyRole("ADMIN", "EMPLOYEE")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .and()
                .logout()
                .permitAll();
    }
}

 */
