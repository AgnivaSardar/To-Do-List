package com.todolist.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.format.annotation.DateTimeFormat;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")

@Controller
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getTask(){
        return taskRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Integer id)
    {
        return taskRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task)
    {
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Integer id, @RequestBody Task updated) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setId(updated.getId());
        task.setTitle(updated.getTitle());
        task.setFlag(updated.getFlag());
        task.setColour(updated.getColour());
        task.setDescription(updated.getDescription());
        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id)
    {
        taskRepository.deleteById(id);
    }


    @GetMapping("/today")
    public List<Task> getTodayTasks() {
        LocalDate today = LocalDate.now();
        return taskRepository.findByDueDate(today);
    }

    @GetMapping("/upcoming")
    public List<Task> getUpcomingTasks(@RequestParam("fromDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate) {
        return taskRepository.findByDueDateAfter(fromDate);
    }

    @GetMapping("/flagged")
    public List<Task> getFlaggedTasks() {
        return taskRepository.findByFlagTrue();
    }

    @GetMapping("/completed")
    public List<Task> getCompletedTasks() {
        return taskRepository.findByCompletedTrue();
    }

}
