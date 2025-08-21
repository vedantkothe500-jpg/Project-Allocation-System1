package com.example.Project_Allocation.Service;

import com.example.Project_Allocation.DAO.QuestionDAO;
import com.example.Project_Allocation.DAO.QuizDao;
import com.example.Project_Allocation.Entity.Question;
import com.example.Project_Allocation.Entity.QuestionWrapper;
import com.example.Project_Allocation.Entity.Quiz;
import com.example.Project_Allocation.Entity.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuizService
{
    @Autowired
    QuizDao qdao;

    @Autowired
    QuestionDAO questionDAO;

    public ResponseEntity<Map<String, Object>> createQuiz(String category,int numq,String difficulty,String title)
    {
        List<Question> que = questionDAO.findRandomQuestionsByCategory(category,difficulty,numq);
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestion(que);
        qdao.save(quiz);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Success");
        response.put("quizId", quiz.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuizQuestion(Integer id)
    {
        Optional<Quiz> quiz = qdao.findById(id);
        List<Question> questions = quiz.get().getQuestion();
        List<QuestionWrapper> questionforUser = new ArrayList<>();
        for(Question q: questions)
        {
            QuestionWrapper qw = new QuestionWrapper(q.getId(),q.getQuestionTitle(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
            questionforUser.add(qw);
        }
        return new ResponseEntity<>(questionforUser,HttpStatus.OK);
    }

//    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses)
//    {
//        Quiz quiz = qdao.findById(id).get();
//        List<Question> questions = quiz.getQuestion();
//        int right=0;
//        int i=0;
//        for(Response response : responses)
//        {
//            if(response.getResponse().equals(questions.get(i).getRightanswer()))
//                right++;
//
//            i++;
//        }
//        return new ResponseEntity<>(right,HttpStatus.OK);
//    }


    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
        Quiz quiz = qdao.findById(id).get();
        List<Question> questions = quiz.getQuestion();

        // Step 1: Convert question list to Map<Id, RightAnswer>
        Map<Integer, String> answerMap = new HashMap<>();
        for (Question q : questions) {
            answerMap.put(q.getId(), q.getRightanswer());
        }

        // Step 2: Match user responses with correct answers
        int right = 0;
        for (Response response : responses) {
            String correctAnswer = answerMap.get(response.getId());
            System.out.println("Response ID: " + response.getId() + ", User Answer: " + response.getResponse());
            System.out.println("Correct Answer: " + correctAnswer);
            if (correctAnswer != null && correctAnswer.equalsIgnoreCase(response.getResponse().trim())) {
                right++;
            }
        }
        return new ResponseEntity<>(right, HttpStatus.OK);
    }
}
