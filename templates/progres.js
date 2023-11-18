document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const submitButton = document.getElementById('submit');
    const currentStepSpan = document.getElementById('currentStep');
    const main = document.getElementById('main');
    const finish = document.getElementById('finish');
    const skip = document.getElementById('skip');
    const textarea = document.getElementById("exerciseAnswer");
    const yourscore = document.getElementById("yourscore");
    
    const API_RESPONSE = 1; // Replace with the actual constant value from your API
    let score = 0;
    let currentStep = 0;
  
    function clearTextarea() {
      textarea.value = "";
    }
  
    submitButton.addEventListener('click', function() {
      // Check if the textarea value is not empty
      if (textarea.value.trim() !== "") {
        steps[currentStep].classList.add('completed');
        currentStep++;
        currentStepSpan.textContent = `${currentStep}/10`;
        clearTextarea();
  
        // Update the score based on the constant API response
        if (API_RESPONSE === 1) {
          score += 10;
        }
      } else if (currentStep === steps.length) {
        main.style.display = "none";
        finish.style.display = "block";
        yourscore.textContent = `${score}/100`;
      }
    });

    skip.addEventListener('click', function() {
      if (currentStep < steps.length) {
        steps[currentStep].classList.add('completed');
        currentStep++;
        currentStepSpan.textContent = `${currentStep}/10`;
        clearTextarea();
      } else if (currentStep === steps.length) {
        main.style.display = "none";
        finish.style.display = "block";
        yourscore.textContent = `${score}/100`;
      }
    });
  });