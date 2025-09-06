(function ($) {
  'use strict';

  const serviceID = 'service_umnfiho';
  const templateID = 'template_46khxul';

  // Navbar on scrolling
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('.navbar').fadeIn('slow').css('display', 'flex');
    } else {
      $('.navbar').fadeOut('slow').css('display', 'none');
    }
  });

  // Smooth scrolling on the navbar links
  $('.navbar-nav a').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();

      $('html, body').animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        'easeInOutExpo',
      );

      if ($(this).parents('.navbar-nav').length) {
        $('.navbar-nav .active').removeClass('active');
        $(this).closest('a').addClass('active');
      }
    }
  });

  // Typed Initiate
  if ($('.typed-text-output').length == 1) {
    var typed_strings = $('.typed-text').text();
    var typed = new Typed('.typed-text-output', {
      strings: typed_strings.split(', '),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $('.btn-play').click(function () {
      $videoSrc = $(this).data('src');
    });
    console.log($videoSrc);

    $('#videoModal').on('shown.bs.modal', function (e) {
      $('#video').attr(
        'src',
        $videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0',
      );
    });

    $('#videoModal').on('hide.bs.modal', function (e) {
      $('#video').attr('src', $videoSrc);
    });
  });

  // Scroll to Bottom
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scroll-to-bottom').fadeOut('slow');
    } else {
      $('.scroll-to-bottom').fadeIn('slow');
    }
  });

  // Skills
  $('.skill').waypoint(
    function () {
      $('.progress .progress-bar').each(function () {
        $(this).css('width', $(this).attr('aria-valuenow') + '%');
      });
    },
    { offset: '80%' },
  );

  // Portfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows',
  });
  $('#portfolio-flters li').on('click', function () {
    $('#portfolio-flters li').removeClass('active');
    $(this).addClass('active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Testimonials carousel
  $('.testimonial-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    dots: true,
    loop: true,
    items: 1,
  });

  // Contact Form with enhanced security
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    // Get form data with sanitization
    var name = sanitizeInput($('#name').val().trim());
    var email = sanitizeInput($('#email').val().trim());
    var subject = sanitizeInput($('#subject').val().trim());
    var message = sanitizeInput($('#message').val().trim());

    // Enhanced validation
    if (
      !validateInput(name, 'name') ||
      !validateInput(email, 'email') ||
      !validateInput(subject, 'subject') ||
      !validateInput(message, 'message')
    ) {
      return;
    }

    // Show loading state
    var submitBtn = $('#contactForm button[type="submit"]');
    var originalText = submitBtn.text();
    submitBtn.prop('disabled', true).text('Sending...');

    // Create mailto link with sanitized data
    var mailtoLink =
      'mailto:youssefyousry994@gmail.com' +
      '?subject=' +
      encodeURIComponent('[Portfolio Contact] ' + subject) +
      '&body=' +
      encodeURIComponent(
        'Name: ' +
          name +
          '\n' +
          'Email: ' +
          email +
          '\n\n' +
          'Message:\n' +
          message +
          '\n\n' +
          '---\n' +
          'This message was sent from your portfolio website.',
      );

    // Try to open email client
    try {
      window.open(mailtoLink, '_blank');
      showFormMessage(
        "Thank you for your message! Your email client should open in a new tab. If it doesn't open automatically, please copy the email address: youssefyousry994@gmail.com",
        'success',
      );
      $('#contactForm')[0].reset();
    } catch (error) {
      showFormMessage(
        'There was an issue opening your email client. Please send an email directly to: youssefyousry994@gmail.com',
        'error',
      );
    }

    // Reset button
    setTimeout(function () {
      submitBtn.prop('disabled', false).text(originalText);
    }, 2000);
  });

  // Input sanitization function
  function sanitizeInput(input) {
    if (typeof input !== 'string') return '';

    // Remove HTML tags and encode special characters
    return input
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  }

  // Enhanced input validation function
  function validateInput(value, type) {
    if (!value || value.length === 0) {
      showFormMessage('Please fill in the ' + type + ' field.', 'error');
      return false;
    }

    switch (type) {
      case 'name':
        if (value.length < 2 || value.length > 50) {
          showFormMessage('Name must be between 2 and 50 characters.', 'error');
          return false;
        }
        if (!/^[a-zA-Z\s\-']+$/.test(value)) {
          showFormMessage(
            'Name can only contain letters, spaces, hyphens, and apostrophes.',
            'error',
          );
          return false;
        }
        break;

      case 'email':
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value) || value.length > 254) {
          showFormMessage('Please enter a valid email address.', 'error');
          return false;
        }
        break;

      case 'subject':
        if (value.length < 3 || value.length > 100) {
          showFormMessage(
            'Subject must be between 3 and 100 characters.',
            'error',
          );
          return false;
        }
        break;

      case 'message':
        if (value.length < 10 || value.length > 1000) {
          showFormMessage(
            'Message must be between 10 and 1000 characters.',
            'error',
          );
          return false;
        }
        break;
    }

    return true;
  }

  // Function to show form messages
  function showFormMessage(message, type) {
    // Remove existing message
    $('.form-message').remove();

    // Create message element
    var messageClass = type === 'success' ? 'alert-success' : 'alert-danger';
    var messageHtml =
      '<div class="form-message alert ' +
      messageClass +
      ' mt-3" role="alert">' +
      message +
      '</div>';

    // Add message after form
    $('#contactForm').after(messageHtml);

    // Auto remove after 8 seconds
    setTimeout(function () {
      $('.form-message').fadeOut(500, function () {
        $(this).remove();
      });
    }, 8000);
  }

  function sendMail() {
    var params = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };

    emailjs.send(serviceID, templateID, params).then(
      function (response) {
        console.log('Email sent successfully:', response);
        alert('Your message has been sent successfully!');
      },
      function (error) {
        console.error('Error sending email:', error);
      },
    );
  }
})(jQuery);
