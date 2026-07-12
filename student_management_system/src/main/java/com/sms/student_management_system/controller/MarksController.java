package com.sms.student_management_system.controller;

import com.sms.student_management_system.entity.Marks;
import com.sms.student_management_system.service.MarksService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin("*")
public class MarksController {

    private final MarksService marksService;

    public MarksController(MarksService marksService) {
        this.marksService = marksService;
    }

    @GetMapping
    public List<Marks> getAllMarks() {
        return marksService.getAllMarks();
    }

    @GetMapping("/{id}")
    public Marks getMarksById(@PathVariable Long id) {
        return marksService.getMarksById(id);
    }

    @PostMapping
    public Marks addMarks(@RequestBody Marks marks) {
        return marksService.saveMarks(marks);
    }

    @PutMapping("/{id}")
    public Marks updateMarks(@PathVariable Long id,
                             @RequestBody Marks marks) {
        return marksService.updateMarks(id, marks);
    }

    @DeleteMapping("/{id}")
    public String deleteMarks(@PathVariable Long id) {
        marksService.deleteMarks(id);
        return "Marks Deleted Successfully";
    }
}