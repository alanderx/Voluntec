// Global variable to store the created user ID after Step 1
let createdUserId = null;

// ============================================
// STEP MANAGEMENT
// ============================================

// Next button - validate and move to Step 2
document.getElementById("btnNextStep").addEventListener('click', async function() {
  const form = document.getElementById("formPersonalInfo");
  
  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Show loading state
  const btn = document.getElementById("btnNextStep");
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Creating account...';

  try {
    // Submit Step 1 data to create user
    const fd = new FormData();
    fd.append('name', document.getElementById("name").value);
    fd.append('email', document.getElementById("email").value);
    fd.append('password', document.getElementById("password").value);
    fd.append('birth_date', document.getElementById("birth_date").value);
    fd.append('city', document.getElementById("city").value);
    fd.append('state', document.getElementById("state").value);
    fd.append('country', document.getElementById("country").value);

    const retorno = await fetch('../../app/user/create_user.php', {
      method: 'POST',
      body: fd
    });

    const resposta = await retorno.json();

    if (resposta.codigo) {
      // Store user ID for Step 2
      createdUserId = resposta.id;
      
      // Hide Step 1, show Step 2
      document.getElementById("step1").classList.remove("active");
      document.getElementById("step2").classList.add("active");
      
      // Update step indicators
      document.getElementById("step1-indicator").classList.remove("active");
      document.getElementById("step1-indicator").classList.add("completed");
      document.getElementById("step2-indicator").classList.add("active");
      
      // Clear any previous errors
      document.getElementById("alerta").innerHTML = "";
    } else {
      // Show error from Step 1
      document.getElementById("alerta").innerHTML = `
        <div class="alert alert-danger">${resposta.msg}</div>
      `;
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  } catch (error) {
    document.getElementById("alerta").innerHTML = `
      <div class="alert alert-danger">Erro ao criar conta: ${error.message}</div>
    `;
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
});

// Back button - return to Step 1
document.getElementById("btnBackStep").addEventListener('click', function() {
  document.getElementById("step2").classList.remove("active");
  document.getElementById("step1").classList.add("active");
  
  document.getElementById("step2-indicator").classList.remove("active");
  document.getElementById("step1-indicator").classList.add("active");
  document.getElementById("step1-indicator").classList.remove("completed");
});

// ============================================
// INTEREST AREA SELECTION
// ============================================

// Listen for interest area checkbox changes
document.querySelectorAll('.interest-area').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    fetchSkillsForSelectedAreas();
  });
});

async function fetchSkillsForSelectedAreas() {
  // Get all checked interest areas
  const checkedAreas = Array.from(document.querySelectorAll('.interest-area:checked'))
    .map(cb => cb.value);

  if (checkedAreas.length === 0) {
    document.getElementById("skillsContainer").innerHTML = 
      '<p class="text-muted">Select interest areas above to see relevant skills</p>';
    return;
  }

  try {
    // Fetch skills for selected interest areas
    const url = `../../app/skill/get_skills_by_interest.php?areas=${checkedAreas.join(',')}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.codigo && data.skills.length > 0) {
      displaySkills(data.skills);
    } else {
      document.getElementById("skillsContainer").innerHTML = 
        '<p class="text-muted">No skills found for selected areas</p>';
    }
  } catch (error) {
    document.getElementById("skillsContainer").innerHTML = 
      '<p class="text-danger">Error loading skills</p>';
  }
}

function displaySkills(skills) {
  const container = document.getElementById("skillsContainer");
  
  // Group skills by type
  const hardSkills = skills.filter(s => s.type === 'hard');
  const softSkills = skills.filter(s => s.type === 'soft');
  
  let html = '';
  
  if (hardSkills.length > 0) {
    html += '<h6 class="mb-2"><strong>Hard Skills</strong></h6>';
    html += '<div class="row g-2 mb-3">';
    hardSkills.forEach(skill => {
      html += `
        <div class="col-md-6">
          <div class="form-check">
            <input class="form-check-input skill-checkbox" type="checkbox" value="${skill.id}" id="skill-${skill.id}" name="skills">
            <label class="form-check-label" for="skill-${skill.id}">${skill.name}</label>
          </div>
        </div>
      `;
    });
    html += '</div>';
  }
  
  if (softSkills.length > 0) {
    html += '<h6 class="mb-2"><strong>Soft Skills</strong></h6>';
    html += '<div class="row g-2 mb-3">';
    softSkills.forEach(skill => {
      html += `
        <div class="col-md-6">
          <div class="form-check">
            <input class="form-check-input skill-checkbox" type="checkbox" value="${skill.id}" id="skill-${skill.id}" name="skills">
            <label class="form-check-label" for="skill-${skill.id}">${skill.name}</label>
          </div>
        </div>
      `;
    });
    html += '</div>';
  }
  
  container.innerHTML = html;
}

// ============================================
// FINAL SUBMISSION
// ============================================

document.getElementById("btnSubmitRegistration").addEventListener('click', async function() {
  // Get all checked skill IDs
  const selectedSkills = Array.from(document.querySelectorAll('.skill-checkbox:checked'))
    .map(cb => cb.value);

  if (selectedSkills.length === 0) {
    document.getElementById("alerta").innerHTML = 
      '<div class="alert alert-warning">Please select at least one skill</div>';
    return;
  }

  // Show loading state
  const btn = document.getElementById("btnSubmitRegistration");
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Saving skills...';

  try {
    // Submit skills for the user
    const fd = new FormData();
    fd.append('skills', JSON.stringify(selectedSkills));

    const retorno = await fetch('../../app/skill/add_user_skills.php', {
      method: 'POST',
      body: fd
    });

    const resposta = await retorno.json();

    if (resposta.codigo) {
      // Success! Redirect to login or home
      document.getElementById("alerta").innerHTML = 
        '<div class="alert alert-success">Registration completed successfully!</div>';
      
      setTimeout(() => {
        window.location.href = '../../login/index.html';
      }, 1500);
    } else {
      document.getElementById("alerta").innerHTML = 
        `<div class="alert alert-danger">${resposta.msg}</div>`;
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  } catch (error) {
    document.getElementById("alerta").innerHTML = 
      `<div class="alert alert-danger">Error saving skills: ${error.message}</div>`;
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
});

