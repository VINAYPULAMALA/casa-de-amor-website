// EmailJS Configuration
const CONFIG = {
  email: {
    serviceId: 'service_6jnewbb', // Replace with your EmailJS service ID
    issueTemplateId: 'template_bjh7sm3', // Replace with your issue template ID
    enquiryTemplateId: 'template_l9an0sq', // Replace with your enquiry template ID
    publicKey: 'i5TYdclyR0ihs1ZxG', // Replace with your EmailJS public key
    adminEmail: 'casadeamorinfo@gmail.com' // Replace with admin email
  }
};

// Initialize EmailJS
(function(){
  emailjs.init(CONFIG.email.publicKey);
})();

// Form state management
let currentForm = 'issue';
const formState = {
  issue: { errors: {}, isSubmitting: false },
  enquiry: { errors: {}, isSubmitting: false }
};

// Validation patterns
const validationPatterns = {
  name: /^[a-zA-Z\s]{2,50}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[\d\s\-\(\)]{8,15}$/
};

// Validation functions
function validateField(fieldId, value, type, formType) {
  const trimmedValue = value.trim();
  
  switch (type) {
    case 'name':
      if (!trimmedValue) return 'Name is required';
      if (!validationPatterns.name.test(trimmedValue)) {
        return 'Please enter a valid name (2-50 characters, letters only)';
      }
      break;
    case 'email':
      if (!trimmedValue) return 'Email is required';
      if (!validationPatterns.email.test(trimmedValue)) {
        return 'Please enter a valid email address';
      }
      break;
    case 'phone':
      if (!trimmedValue) return 'Phone number is required';
      if (!validationPatterns.phone.test(trimmedValue)) {
        return 'Please enter a valid phone number';
      }
      break;
    case 'date':
      if (!trimmedValue) return 'Date is required';
      const selectedDate = new Date(trimmedValue);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        return 'Please select a future date';
      }
      break;
    case 'required':
      if (!trimmedValue) return 'This field is required';
      break;
  }
  return null;
}

function showFieldError(fieldId, message, formType) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  const inputElement = document.getElementById(fieldId);
  
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  if (inputElement) {
    inputElement.classList.add('is-invalid');
  }
  
  formState[formType].errors[fieldId] = message;
}

function clearFieldError(fieldId, formType) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  const inputElement = document.getElementById(fieldId);
  
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
  
  if (inputElement) {
    inputElement.classList.remove('is-invalid');
  }
  
  delete formState[formType].errors[fieldId];
}

function clearAllErrors(formType) {
  Object.keys(formState[formType].errors).forEach(fieldId => {
    clearFieldError(fieldId, formType);
  });
}

// Tab management
function switchTab(tabType) {
  currentForm = tabType;
  
  // Update tab buttons
  const issueTab = document.getElementById('issue-tab');
  const enquiryTab = document.getElementById('enquiry-tab');
  
  if (tabType === 'issue') {
    issueTab.classList.add('active', 'orange-bg', 'text-white');
    issueTab.classList.remove('bg-white', 'text-dark');
    enquiryTab.classList.remove('active', 'orange-bg', 'text-white');
    enquiryTab.classList.add('bg-white', 'text-dark');
  } else {
    enquiryTab.classList.add('active', 'orange-bg', 'text-white');
    enquiryTab.classList.remove('bg-white', 'text-dark');
    issueTab.classList.remove('active', 'orange-bg', 'text-white');
    issueTab.classList.add('bg-white', 'text-dark');
  }
}

// Contact method toggle for issue form
function toggleContactMethod() {
  const emailRadio = document.getElementById('issue-email-contact');
  const phoneRadio = document.getElementById('issue-phone-contact');
  const emailField = document.getElementById('issue-email-field');
  const phoneField = document.getElementById('issue-phone-field');
  
  if (emailRadio.checked) {
    emailField.style.display = 'block';
    phoneField.style.display = 'none';
    document.getElementById('issue-phone').value = '';
    clearFieldError('issue-phone', 'issue');
  } else if (phoneRadio.checked) {
    phoneField.style.display = 'block';
    emailField.style.display = 'none';
    document.getElementById('issue-email').value = '';
    clearFieldError('issue-email', 'issue');
  }
}

// Character count updates
function updateCharacterCount(textareaId, counterId) {
  const textarea = document.getElementById(textareaId);
  const counter = document.getElementById(counterId);
  
  if (textarea && counter) {
    counter.textContent = textarea.value.length;
  }
}

// Form validation
function validateForm(formType) {
  clearAllErrors(formType);
  let isValid = true;
  
  if (formType === 'issue') {
    // Validate issue form
    const name = document.getElementById('issue-name').value;
    const contactMethod = document.querySelector('input[name="issue-contact-method"]:checked');
    const bookingDetails = document.getElementById('issue-booking-details').value;
    const bookingDate = document.getElementById('issue-booking-date').value;
    const bookingTime = document.getElementById('issue-booking-time').value;
    const description = document.getElementById('issue-description').value;
    
    // Name validation
    const nameError = validateField('issue-name', name, 'name', formType);
    if (nameError) {
      showFieldError('issue-name', nameError, formType);
      isValid = false;
    }
    
    // Contact method validation
    if (!contactMethod) {
      showFieldError('issue-contact-method', 'Please select a contact method', formType);
      isValid = false;
    } else {
      if (contactMethod.value === 'email') {
        const email = document.getElementById('issue-email').value;
        const emailError = validateField('issue-email', email, 'email', formType);
        if (emailError) {
          showFieldError('issue-email', emailError, formType);
          isValid = false;
        }
      } else {
        const phone = document.getElementById('issue-phone').value;
        const phoneError = validateField('issue-phone', phone, 'phone', formType);
        if (phoneError) {
          showFieldError('issue-phone', phoneError, formType);
          isValid = false;
        }
      }
    }
    
    // Other validations
    const bookingDetailsError = validateField('issue-booking-details', bookingDetails, 'required', formType);
    if (bookingDetailsError) {
      showFieldError('issue-booking-details', bookingDetailsError, formType);
      isValid = false;
    }
    
    const bookingDateError = validateField('issue-booking-date', bookingDate, 'date', formType);
    if (bookingDateError) {
      showFieldError('issue-booking-date', bookingDateError, formType);
      isValid = false;
    }
    
    if (!bookingTime.trim()) {
      showFieldError('issue-booking-time', 'Please select a booking time', formType);
      isValid = false;
    }
    
    const descriptionError = validateField('issue-description', description, 'required', formType);
    if (descriptionError) {
      showFieldError('issue-description', descriptionError, formType);
      isValid = false;
    }
    
  } else {
    // Validate enquiry form
    const name = document.getElementById('enquiry-name').value;
    const contact = document.getElementById('enquiry-contact').value;
    const date = document.getElementById('enquiry-date').value;
    const time = document.getElementById('enquiry-time').value;
    const people = document.getElementById('enquiry-people').value;
    const description = document.getElementById('enquiry-description').value;
    
    const nameError = validateField('enquiry-name', name, 'name', formType);
    if (nameError) {
      showFieldError('enquiry-name', nameError, formType);
      isValid = false;
    }
    
    const contactError = validateField('enquiry-contact', contact, 'phone', formType);
    if (contactError) {
      showFieldError('enquiry-contact', contactError, formType);
      isValid = false;
    }
    
    const dateError = validateField('enquiry-date', date, 'date', formType);
    if (dateError) {
      showFieldError('enquiry-date', dateError, formType);
      isValid = false;
    }
    
    if (!time.trim()) {
      showFieldError('enquiry-time', 'Please select a preferred time', formType);
      isValid = false;
    }
    
    if (!people.trim()) {
      showFieldError('enquiry-people', 'Please select number of people', formType);
      isValid = false;
    }
    
    const descriptionError = validateField('enquiry-description', description, 'required', formType);
    if (descriptionError) {
      showFieldError('enquiry-description', descriptionError, formType);
      isValid = false;
    }
  }
  
  return isValid;
}

// Loading state management
function showLoading(formType) {
  const submitBtn = document.getElementById(`${formType}-submit-btn`);
  const submitText = document.getElementById(`${formType}-submit-text`);
  const loadingSpinner = document.getElementById(`${formType}-loading`);
  
  submitText.classList.add('d-none');
  loadingSpinner.classList.remove('d-none');
  submitBtn.disabled = true;
  formState[formType].isSubmitting = true;
}

function hideLoading(formType) {
  const submitBtn = document.getElementById(`${formType}-submit-btn`);
  const submitText = document.getElementById(`${formType}-submit-text`);
  const loadingSpinner = document.getElementById(`${formType}-loading`);
  
  submitText.classList.remove('d-none');
  loadingSpinner.classList.add('d-none');
  submitBtn.disabled = false;
  formState[formType].isSubmitting = false;
}

// Email sending
function sendEmail(formData, formType) {
  let templateParams = {};
  
  if (formType === 'issue') {
    templateParams = {
      to_name: 'Casa de Amor Team',
      to_email: CONFIG.email.adminEmail,
      from_name: formData.name,
      reply_to: formData.contactInfo,
      subject: 'Issue Report - Casa de Amor',
      form_type: 'ISSUE REPORT',
      contact_method: formData.contactMethod,
      contact_info: formData.contactInfo,
      booking_details: formData.bookingDetails,
      booking_date: formData.bookingDate,
      booking_time: formData.bookingTime,
      walk_in_time: formData.walkInTime || 'Not provided',
      walk_out_time: formData.walkOutTime || 'Not provided',
      issue_description: formData.description,
      message: `
Issue Report from ${formData.name}

Contact Method: ${formData.contactMethod}
Contact Info: ${formData.contactInfo}
Booking Details: ${formData.bookingDetails}
Booking Date: ${formData.bookingDate}
Booking Time: ${formData.bookingTime}
Walk-in Time: ${formData.walkInTime || 'Not provided'}
Walk-out Time: ${formData.walkOutTime || 'Not provided'}

Issue Description:
${formData.description}
      `
    };
  } else {
    templateParams = {
      to_name: 'Casa de Amor Team',
      to_email: CONFIG.email.adminEmail,
      from_name: formData.name,
      from_email: formData.contact, // Using phone as fallback
      reply_to: formData.contact,
      subject: 'New Enquiry - Casa de Amor',
      form_type: 'ENQUIRY',
      contact_number: formData.contact,
      phone: formData.contact, // Alternative parameter name
      preferred_date: formData.date,
      date: formData.date, // Alternative parameter name
      preferred_time: formData.time,
      time: formData.time, // Alternative parameter name
      number_of_people: formData.people,
      people: formData.people, // Alternative parameter name
      enquiry_description: formData.description,
      description: formData.description, // Alternative parameter name
      message: `From: ${formData.name}
Phone: ${formData.contact}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}
Number of People: ${formData.people}

Enquiry Description:
${formData.description}`
    };
  }
  
  const templateId = formType === 'issue' ? 
    CONFIG.email.issueTemplateId : 
    CONFIG.email.enquiryTemplateId;
  
  console.log('Sending email with parameters:', templateParams);
  console.log('Template ID being used:', templateId);
  console.log('Form data received:', formData);
  
  return emailjs.send(
    CONFIG.email.serviceId,
    templateId,
    templateParams
  );
}

// Form submission
function handleFormSubmission(formType, formData) {
  showLoading(formType);
  
  sendEmail(formData, formType)
    .then(response => {
      console.log(`${formType} form submitted successfully:`, response);
      hideLoading(formType);
      
      // Reset form
      document.getElementById(`${formType}-form-element`).reset();
      clearAllErrors(formType);
      
      // Show success popup
      const modal = new bootstrap.Modal(document.getElementById('success-popup'));
      const successMessage = document.getElementById('success-message');
      
      if (formType === 'issue') {
        successMessage.textContent = 'Thank you for reporting the issue. We\'ll investigate and get back to you soon.';
      } else {
        successMessage.textContent = 'Thank you for your enquiry! We\'ll get back to you soon with more information.';
      }
      
      modal.show();
      
      // Reset character counts
      if (formType === 'issue') {
        updateCharacterCount('issue-description', 'issue-description-count');
      } else {
        updateCharacterCount('enquiry-description', 'enquiry-description-count');
      }
    })
    .catch(error => {
      console.error(`Error submitting ${formType} form:`, error);
      hideLoading(formType);
      alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  document.getElementById('issue-tab').addEventListener('click', () => switchTab('issue'));
  document.getElementById('enquiry-tab').addEventListener('click', () => switchTab('enquiry'));
  
  // Contact method toggle
  document.getElementById('issue-email-contact').addEventListener('change', toggleContactMethod);
  document.getElementById('issue-phone-contact').addEventListener('change', toggleContactMethod);
  
  // Character count updates
  document.getElementById('issue-description').addEventListener('input', function() {
    updateCharacterCount('issue-description', 'issue-description-count');
  });
  
  document.getElementById('enquiry-description').addEventListener('input', function() {
    updateCharacterCount('enquiry-description', 'enquiry-description-count');
  });
  
  // Form submissions
  document.getElementById('issue-form-element').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (formState.issue.isSubmitting) return;
    
    if (!validateForm('issue')) return;
    
    const contactMethod = document.querySelector('input[name="issue-contact-method"]:checked');
    const contactInfo = contactMethod.value === 'email' ? 
      document.getElementById('issue-email').value : 
      document.getElementById('issue-phone').value;
    
    const formData = {
      name: document.getElementById('issue-name').value,
      contactMethod: contactMethod.value,
      contactInfo: contactInfo,
      bookingDetails: document.getElementById('issue-booking-details').value,
      bookingDate: document.getElementById('issue-booking-date').value,
      bookingTime: document.getElementById('issue-booking-time').value,
      walkInTime: document.getElementById('issue-walk-in-time').value,
      walkOutTime: document.getElementById('issue-walk-out-time').value,
      description: document.getElementById('issue-description').value
    };
    
    handleFormSubmission('issue', formData);
  });
  
  document.getElementById('enquiry-form-element').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (formState.enquiry.isSubmitting) return;
    
    if (!validateForm('enquiry')) return;
    
    const formData = {
      name: document.getElementById('enquiry-name').value,
      contact: document.getElementById('enquiry-contact').value,
      date: document.getElementById('enquiry-date').value,
      time: document.getElementById('enquiry-time').value,
      people: document.getElementById('enquiry-people').value,
      description: document.getElementById('enquiry-description').value
    };
    
    handleFormSubmission('enquiry', formData);
  });
  
  // Real-time validation
  const validationFields = [
    { id: 'issue-name', type: 'name', form: 'issue' },
    { id: 'issue-email', type: 'email', form: 'issue' },
    { id: 'issue-phone', type: 'phone', form: 'issue' },
    { id: 'issue-booking-date', type: 'date', form: 'issue' },
    { id: 'enquiry-name', type: 'name', form: 'enquiry' },
    { id: 'enquiry-contact', type: 'phone', form: 'enquiry' },
    { id: 'enquiry-date', type: 'date', form: 'enquiry' }
  ];
  
  validationFields.forEach(field => {
    const element = document.getElementById(field.id);
    if (element) {
      element.addEventListener('blur', function() {
        const value = this.value;
        if (value.trim()) {
          const error = validateField(field.id, value, field.type, field.form);
          if (error) {
            showFieldError(field.id, error, field.form);
          } else {
            clearFieldError(field.id, field.form);
          }
        }
      });
    }
  });
});

// Navbar scroll effect
window.onscroll = function () {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
};