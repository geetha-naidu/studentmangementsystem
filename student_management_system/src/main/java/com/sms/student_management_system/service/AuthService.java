package com.sms.student_management_system.service;

import com.sms.student_management_system.entity.User;
import com.sms.student_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public String register(User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already exists";
        }

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public String login(String username, String password) {

        User user = userRepository.findByUsername(username);

        if (user == null) {
            return "User Not Found";
        }

        if (!user.getPassword().equals(password)) {
            return "Invalid Password";
        }

        return "Login Successful";
    }
}