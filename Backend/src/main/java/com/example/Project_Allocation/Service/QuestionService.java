package com.example.Project_Allocation.Service;

import com.example.Project_Allocation.DAO.QuestionDAO;
import com.example.Project_Allocation.Entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService
{
     @Autowired
    QuestionDAO qdao;

    public ResponseEntity<List<Question>> getAlQuestion()
    {
        try{
            return new ResponseEntity<>(qdao.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }


    public ResponseEntity<String> addMultipleQuestions(List<Question> questions) {
        try {
            qdao.saveAll(questions); // saveAll is used for list
            return new ResponseEntity<>("All Questions Inserted Successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Insertion Failed", HttpStatus.BAD_REQUEST);
        }
    }

    // ✅ DELETE question

    public ResponseEntity<String> deleteQuestion(Integer id) {
        if (!qdao.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Question not found");
        }
        qdao.deleteById(id);
        return ResponseEntity.ok("✅ Question deleted successfully");
    }

    // ✅ UPDATE question
    public ResponseEntity<String> updateQuestion(Integer id, Question updatedQuestion) {
        Optional<Question> existing = qdao.findById(id);
        if (existing.isPresent()) {
            Question q = existing.get();
            q.setQuestionTitle(updatedQuestion.getQuestionTitle());
            q.setOption1(updatedQuestion.getOption1());
            q.setOption2(updatedQuestion.getOption2());
            q.setOption3(updatedQuestion.getOption3());
            q.setOption4(updatedQuestion.getOption4());
            q.setRightanswer(updatedQuestion.getRightanswer());
            q.setCategory(updatedQuestion.getCategory());
            q.setDifficultylevel(updatedQuestion.getDifficultylevel());

            qdao.save(q);
            return ResponseEntity.ok("✅ Question updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Question not found");
        }
    }

}
