package com.sms.student_management_system.service;

import com.sms.student_management_system.entity.Marks;
import com.sms.student_management_system.repository.MarksRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarksService {

    private final MarksRepository marksRepository;

    public MarksService(MarksRepository marksRepository) {
        this.marksRepository = marksRepository;
    }

    public List<Marks> getAllMarks() {
        return marksRepository.findAll();
    }

    public Marks getMarksById(Long id) {
        return marksRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Marks Not Found"));
    }

    public Marks saveMarks(Marks marks) {
        return marksRepository.save(marks);
    }

    public Marks updateMarks(Long id, Marks marks) {

        Marks existingMarks = marksRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Marks Not Found"));

        existingMarks.setStudent(marks.getStudent());
        existingMarks.setCourse(marks.getCourse());
        existingMarks.setInternalMarks(marks.getInternalMarks());
        existingMarks.setExternalMarks(marks.getExternalMarks());
        existingMarks.setTotalMarks(marks.getTotalMarks());
        existingMarks.setGrade(marks.getGrade());

        return marksRepository.save(existingMarks);
    }

    public void deleteMarks(Long id) {
        marksRepository.deleteById(id);
    }
}