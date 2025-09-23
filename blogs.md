---
layout: default
title: "Blogs & Insights"
description: "Read Consumer Kanvas blogs on startup growth, customer insights, product-market fit, lowering CAC, boosting LTV, and building investor-ready businesses in India."
---

<!-- The navigation below is only needed if your default layout does NOT include it. 
     If your layout already provides navigation, REMOVE this <nav> block for consistency. -->
<nav>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="blogs.html" class="active">Blogs & Insights</a></li>
    <li><a href="about-us.html">About Us</a></li>
    <li><a href="Contact.html">Contact</a></li> 
  </ul>
</nav>

<!-- HERO SECTION styled to match About Us / Contact style -->
<section id="hero" class="hero blogs-hero">
  <div class="about-card">
    <h1>Consumer Insights That Drive Startup Growth in India</h1>
    <p>
      From lowering CAC to validating product-market fit, our blogs and insights give Indian founders practical strategies backed by real customer research.<br>
      Learn how to de-risk growth, win investors, and scale smarter.
    </p>
    <form class="search-bar" action="/search.html" method="get">
      <input type="text" name="q" placeholder="Search insights..." aria-label="Search blog posts" />
      <button type="submit">Search</button>
    </form>
  </div>
</section>

<!-- BLOG LIST SECTION -->
<section class="blogs-list container">
  <h2>Latest Insights</h2>
  <div class="blog-grid">
    {% for post in site.posts limit:6 %}
      <article class="blog-card">
        <a href="{{ post.url }}">
          {% if post.image %}
            <img src="{{ post.image }}" alt="{{ post.title }}">
          {% endif %}
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
        </a>
        <span class="blog-meta">{{ post.date | date: "%B %Y" }}{% if post.categories %} | {{ post.categories | join: ', ' }}{% endif %}</span>
      </article>
    {% endfor %}
  </div>
</section>

<!-- CATEGORIES SECTION -->
<section class="blog-categories container">
  <h2>Browse by Category</h2>
  <ul>
    {% for category in site.categories %}
      <li>
        <a href="/categories/{{ category[0] | slugify }}/">{{ category[0] }}</a>
      </li>
    {% endfor %}
  </ul>
</section>

<!-- CTA SECTION -->
<section class="blogs-cta container">
  <h2>Turn Insights Into Growth</h2>
  <p>
    Don’t just read about strategies—test them live with your customers. Our Founder’s Edge System helps you validate, scale, and win faster in India.
  </p>
  <a href="/Contact.html" class="btn-primary">Book a Free Consultation</a>
</section>

<!-- WhatsApp Floating Button -->
<a href="https://wa.me/9821379658" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
</a>

<!-- 
  For full consistency, ensure your style.css contains CSS for:
    - .container
    - .about-card
    - .hero.blogs-hero
    - .search-bar
    - .blogs-list, .blog-grid, .blog-card, .blog-meta
    - .blog-categories
    - .blogs-cta, .btn-primary
    - .whatsapp-float
  You can copy CSS from About/Contact pages if needed!
-->
