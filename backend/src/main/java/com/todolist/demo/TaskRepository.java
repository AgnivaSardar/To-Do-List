package com.todolist.demo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface TaskRepository extends JpaRepository<Task,Integer> {
    List<Task> findByDueDate(LocalDate dueDate);
    List<Task> findByDueDateAfter(LocalDate date);
    List<Task> findByFlagTrue();
    List<Task> findByCompletedTrue();
    List<Task> findByTitleContainingIgnoreCase(String title);

}
