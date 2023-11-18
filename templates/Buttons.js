document.addEventListener('DOMContentLoaded', function() {
  const butonLButtons = document.querySelectorAll('.butonL');
  const butonDButtons = document.querySelectorAll('.butonD');
  const nextDiv = document.getElementById('PurpleB');
  const getStartedDiv = document.getElementById('GrayB');

  let lastButonLPressed = null;
  let lastButonDPressed = null;

  getStartedDiv.style.display = "block";

  function updateToggleDiv(button, categoryButtons, lastPressed, divId) {
    // Toggle the clicked button
    button.classList.toggle('active');

    // Untoggle other buttons in the same category
    categoryButtons.forEach(function(otherButton) {
      if (otherButton !== button) {
        otherButton.classList.remove('active');
      }
    });

    // Check if there is at least one button toggled in both categories
    const isButonLActive = Array.from(butonLButtons).some(b => b.classList.contains('active'));
    const isButonDActive = Array.from(butonDButtons).some(b => b.classList.contains('active'));

    // Update the last pressed button for the corresponding category
    if (divId === 'butonL') {
      lastButonLPressed = isButonLActive ? button : null;
    } else if (divId === 'butonD') {
      lastButonDPressed = isButonDActive ? button : null;
    }


    // Toggle the "next" div based on the conditions
    nextDiv.style.display = isButonLActive && isButonDActive ? 'block' : 'none';

    // Toggle the "GetStarted" div based on the conditions
    getStartedDiv.style.display = nextDiv.style.display === 'none' ? 'block' : 'none';
  }

  // Add click event listeners for butonL buttons
  butonLButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      updateToggleDiv(button, butonLButtons, lastButonLPressed, 'butonL');
    });
  });

  // Add click event listeners for butonD buttons
  butonDButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      updateToggleDiv(button, butonDButtons, lastButonDPressed, 'butonD');
    });
  });
});