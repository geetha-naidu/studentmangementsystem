package com.sms.student_management_system.controller;

import com.sms.student_management_system.repository.AttendanceRepository;
import com.sms.student_management_system.repository.CourseRepository;
import com.sms.student_management_system.repository.FacultyRepository;
import com.sms.student_management_system.repository.MarksRepository;
import com.sms.student_management_system.repository.StudentRepository;
import com.sms.student_management_system.entity.Student;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final CourseRepository courseRepository;
    private final AttendanceRepository attendanceRepository;
    private final MarksRepository marksRepository;

    public DashboardController(StudentRepository studentRepository,
                               FacultyRepository facultyRepository,
                               CourseRepository courseRepository,
                               AttendanceRepository attendanceRepository,
                               MarksRepository marksRepository) {

        this.studentRepository = studentRepository;
        this.facultyRepository = facultyRepository;
        this.courseRepository = courseRepository;
        this.attendanceRepository = attendanceRepository;
        this.marksRepository = marksRepository;
    }

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {

        Map<String, Object> data = new HashMap<>();

        data.put("students", studentRepository.count());
        data.put("faculty", facultyRepository.count());
        data.put("courses", courseRepository.count());
        data.put("attendance", attendanceRepository.count());
        data.put("marks", marksRepository.count());

        List<Student> students = studentRepository.findAll();

        Set<String> departments = new HashSet<>();

        for(Student s : students){
            departments.add(s.getDepartment());
        }

        data.put("departments", departments.size());

        return data;
    }

    @GetMapping("/recentStudents")
    public List<Student> recentStudents(){

        List<Student> students = studentRepository.findAll();

        Collections.reverse(students);

        if(students.size()>5){
            return students.subList(0,5);
        }

        return students;
    }

}