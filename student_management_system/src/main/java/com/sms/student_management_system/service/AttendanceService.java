package com.sms.student_management_system.service;

import com.sms.student_management_system.entity.Attendance;
import com.sms.student_management_system.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Attendance Not Found"));
    }

    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public Attendance updateAttendance(Long id,
                                       Attendance attendance) {

        Attendance existingAttendance =
                attendanceRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Attendance Not Found"));

        existingAttendance.setStudent(attendance.getStudent());
        existingAttendance.setCourse(attendance.getCourse());
        existingAttendance.setAttendanceDate(
                attendance.getAttendanceDate());
        existingAttendance.setStatus(
                attendance.getStatus());

        return attendanceRepository.save(existingAttendance);
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }
}