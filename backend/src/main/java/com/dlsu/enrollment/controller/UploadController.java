package com.dlsu.enrollment.controller;

import com.dlsu.enrollment.model.Grade;
import com.dlsu.enrollment.repository.GradeRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

@RestController
@RequestMapping("/upload")
@CrossOrigin(origins = "*")
public class UploadController {

    @Autowired
    private GradeRepository gradeRepo;

    // Upload Grade Sheet
    @PostMapping("/grades")
    public String uploadGradeSheet(@RequestParam("file") MultipartFile file, 
                                   @RequestParam("courseCode") String courseCode, 
                                   @RequestParam("section") String section) throws IOException {

        // Process the Excel file
        try (InputStream is = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            // Skip the header row
            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            // Read each row from the Excel sheet
            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                String username = row.getCell(0).getStringCellValue();  // username is in the first column
                String grade = row.getCell(1).getStringCellValue();    // grade is in the second column

                // Save the grade for the student
                Grade gradeEntry = new Grade(username, courseCode, section, grade);
                gradeRepo.save(gradeEntry);
            }

            workbook.close();
        } catch (IOException e) {
            return "Failed to upload the file: " + e.getMessage();
        }

        return "Grades uploaded successfully!";
    }
}
