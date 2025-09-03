package com.todolist.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000","https://to-do-list-frontend-ry33.vercel.app/"})
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getTask() {
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Integer id) {
        return taskRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Integer id, @RequestBody Task updated) {
        System.out.println("Updating task id: " + id + " with status: " + updated.getStatus() + ", date: " + updated.getDate());
        Task task = taskRepository.findById(id).orElseThrow();
        task.setTitle(updated.getTitle());
        task.setFlag(updated.getFlag());
        task.setDescription(updated.getDescription());
        task.setStatus(updated.getStatus());
        task.setDate(updated.getDate());
        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskRepository.deleteById(id);
    }

    @GetMapping("/today")
    public List<Task> getTodayTasks() {
        LocalDate today = LocalDate.now();
        return taskRepository.findByDate(today);
    }

    @GetMapping("/upcoming")
    public List<Task> getUpcomingTasks(
            @RequestParam("fromDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate) {
        return taskRepository.findByDateAfter(fromDate);
    }

    @GetMapping("/flagged")
    public List<Task> getFlaggedTasks() {
        return taskRepository.findByFlagTrue();
    }

    @GetMapping("/completed")
    public List<Task> getCompletedTasks() {
        return taskRepository.findByStatusTrue();
    }

    @GetMapping("/search")
    public List<Task> searchTasks(@RequestParam String query) {
        return taskRepository.findByTitleContainingIgnoreCase(query);
    }

    @GetMapping("/incomplete")
    public List<Task> getIncompleteTasks() {
        LocalDate today = LocalDate.now();
        return taskRepository.findByDateBeforeAndStatus(today, false);
    }

}
