document.addEventListener('DOMContentLoaded', function() {
  const faqContent = document.querySelector('#faq-accordion .accordion-content');
  
  if (faqContent) {
    // Clear placeholder content
    faqContent.innerHTML = '';
    
    // Create intro paragraph
    const introText = document.createElement('p');
    introText.className = 'section-intro';
    introText.textContent = 'Answers to commonly asked questions about our services, booking process, and more.';
    faqContent.appendChild(introText);
    
    // Define FAQ data
    const faqSections = [
      {
        title: 'General Questions',
        questions: [
          {
            question: 'Do you accommodate special diets?',
            answer: 'Absolutely. Our chefs specialize in a wide range of dietary accommodations—from gluten-free to vegan, paleo, low-sodium, and more. Let us know what you need, and we\'ll match you with a chef who can deliver.'
          },
          {
            question: 'Are you licensed and insured?',
            answer: 'Yes. All chefs are vetted professionals, and the SBCC team carries appropriate licenses and insurance for events and private service.'
          }
        ]
      },
      {
        title: 'Booking & Pricing',
        questions: [
          {
            question: 'How far in advance should I book?',
            answer: 'We recommend booking at least 2–4 weeks in advance for events, and 5–7 days in advance for weekly meal service. That said, we\'ll always do our best to accommodate your timing.'
          },
          {
            question: 'Do you travel outside of Santa Barbara?',
            answer: 'Yes, many of our chefs will travel throughout the region. Additional travel fees may apply depending on location.'
          },
          {
            question: 'How much does it cost?',
            answer: 'Pricing varies based on service type, guest count, chef, and complexity. We offer full transparency before anything is confirmed.'
          }
        ]
      },
      {
        title: 'Events & Gatherings',
        questions: [
          {
            question: 'Can I customize a menu?',
            answer: 'Yes. Every SBCC experience is tailored to your preferences. You can collaborate with your chef or select from curated menus.'
          },
          {
            question: 'Do I need to provide anything in my kitchen?',
            answer: 'For in-home events or meal prep, we\'ll discuss your kitchen setup in advance. Most chefs bring their own specialty tools, but access to a stove and fridge is usually essential.'
          },
          {
            question: 'Do you offer tastings?',
            answer: 'In some cases, yes. Especially for weddings or large events, we can arrange tastings with select chefs. Inquire early to ensure availability.'
          }
        ]
      },
      {
        title: 'Signature Meal Program',
        questions: [
          {
            question: 'What\'s the difference between the Signature Meal Program and booking a chef for an event?',
            answer: 'The Signature Meal Program is built around regular nourishment—delivered or cooked in your home. Event services are designed for one-time, hosted occasions. Different cadence, same heart.'
          }
        ]
      },
      {
        title: 'Other Information',
        questions: [
          {
            question: 'What if I don\'t see what I\'m looking for?',
            answer: 'Reach out! We thrive on creative requests and custom events. Whether it\'s a themed dinner or unique dietary plan, we\'re excited to collaborate.'
          }
        ]
      }
    ];
    
    // Create each FAQ section
    faqSections.forEach(function(section) {
      // Add section header
      const sectionHeader = document.createElement('h4');
      sectionHeader.textContent = section.title;
      faqContent.appendChild(sectionHeader);
      
      // Create grid for questions
      const questionGrid = document.createElement('div');
      questionGrid.className = 'category-grid';
      
      // Add each question card
      section.questions.forEach(function(qa) {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        const questionTitle = document.createElement('h4');
        questionTitle.className = 'category-title';
        questionTitle.textContent = qa.question;
        
        const divider = document.createElement('div');
        divider.className = 'divider';
        
        const answerText = document.createElement('p');
        answerText.textContent = qa.answer;
        
        card.appendChild(questionTitle);
        card.appendChild(divider);
        card.appendChild(answerText);
        
        questionGrid.appendChild(card);
      });
      
      faqContent.appendChild(questionGrid);
      
      // Add section divider if not the last section
      if (section !== faqSections[faqSections.length - 1]) {
        const sectionDivider = document.createElement('div');
        sectionDivider.className = 'section-divider';
        faqContent.appendChild(sectionDivider);
      }
    });
  }
});
