package com.todolist.demo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface TaskRepository extends JpaRepository<Task,Integer> {
    List<Task> findByDate(LocalDate date);
    List<Task> findByDateAfter(LocalDate date);
    List<Task> findByFlagTrue();
    List<Task> findByStatusTrue();
    List<Task> findByTitleContainingIgnoreCase(String title);
    List<Task> findByDateBeforeAndStatus(LocalDate date, boolean status);
}
