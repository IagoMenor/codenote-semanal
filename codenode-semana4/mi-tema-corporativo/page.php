<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
    <section class="page-header" style="background: var(--dark); padding: 60px 0; color: white; text-align: center;">
        <div class="container">
            <h1 style="margin: 0; font-size: 2.5rem;"><?php the_title(); ?></h1>
        </div>
    </section>

    <article class="container" style="background: white; margin-top: -30px; margin-bottom: 60px; padding: 50px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); min-height: 400px;">
        <div class="entry-content" style="font-size: 1.1rem; color: var(--text); line-height: 1.8;">
            <?php the_content(); ?>
        </div>
    </article>
<?php endwhile; ?>

<?php get_footer(); ?>