from github import Github
import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime
import os

def pr_duration(pull_requests):
    pr_durations = []
    authors = []
    author_colors = {}
    color_palette = plt.cm.tab20.colors  # Using a matplotlib colormap for distinct colors

    # Data for the second chart
    pr_created_dates = []
    pr_review_times = []

    for pr in pull_requests:
        if pr.closed_at:
            duration = (pr.closed_at - pr.created_at).days
            pr_durations.append(duration)
            authors.append(pr.user.login)

            # For average time per PR over time
            pr_created_dates.append(pr.created_at)
            reviews = pr.get_reviews()
            if reviews.totalCount > 0:
                first_review = min(reviews, key=lambda r: r.submitted_at)
                time_to_first_review = (first_review.submitted_at - pr.created_at).days
                pr_review_times.append(time_to_first_review)
            else:
                pr_review_times.append(duration)  # No review, use close time

    # Assign a unique color to each author
    unique_authors = set(authors)
    for i, author in enumerate(unique_authors):
        author_colors[author] = color_palette[i % len(color_palette)]

    # Generate bar colors based on authors for the first plot
    bar_colors = [author_colors[author] for author in authors]

    # Plotting PR Duration Timeline
    plt.figure(figsize=(12, 6))
    plt.bar(range(len(pr_durations)), pr_durations, color=bar_colors)
    plt.xlabel('PR Index')
    plt.ylabel('Duration (Days)')
    plt.title('PR Duration by Author')
    # Create a legend for the authors
    handles = [plt.Rectangle((0,0),1,1, color=author_colors[author]) for author in unique_authors]
    plt.legend(handles, unique_authors, title="Authors")
    plt.tight_layout()
    plt.close()

    # Plotting Average PR Review Time Over Time
    plt.figure(figsize=(12, 6))
    sorted_dates_indices = np.argsort(pr_created_dates)
    sorted_review_times = np.array(pr_review_times)[sorted_dates_indices]
    moving_avg_review_time = np.convolve(sorted_review_times, np.ones(10)/10, mode='valid')  # 10 PR moving average

    plt.plot(sorted_review_times, label='Review Time (Days)')
    plt.plot(range(len(moving_avg_review_time)), moving_avg_review_time, label='10 PR Moving Avg', color='red')
    plt.xlabel('PR Index (Sorted by Creation Date)')
    plt.ylabel('Review Time (Days)')
    plt.title('PR Review Time Trend')
    plt.legend()
    plt.tight_layout()
    plt.close()    
    
    pr_durations = []
    authors = []
    author_colors = {}
    color_palette = plt.cm.tab20.colors  # Using a matplotlib colormap for distinct colors

    # Data for the second chart
    pr_created_dates = []
    pr_review_times = []

    for pr in pull_requests:
        if pr.closed_at:
            duration = (pr.closed_at - pr.created_at).days
            pr_durations.append(duration)
            authors.append(pr.user.login)

            # For average time per PR over time
            pr_created_dates.append(pr.created_at)
            reviews = pr.get_reviews()
            if reviews.totalCount > 0:
                first_review = min(reviews, key=lambda r: r.submitted_at)
                time_to_first_review = (first_review.submitted_at - pr.created_at).days
                pr_review_times.append(time_to_first_review)
            else:
                pr_review_times.append(duration)  # No review, use close time

    # Assign a unique color to each author
    unique_authors = set(authors)
    for i, author in enumerate(unique_authors):
        author_colors[author] = color_palette[i % len(color_palette)]

    # Generate bar colors based on authors
    bar_colors = [author_colors[author] for author in authors]

    # Plotting PR Duration Timeline
    plt.figure(figsize=(12, 6))
    plt.bar(range(len(pr_durations)), pr_durations, color=bar_colors)
    plt.xlabel('PR Index')
    plt.ylabel('Duration (Days)')
    plt.title('PR Duration by Author')
    # Create a legend for the authors
    handles = [plt.Rectangle((0,0),1,1, color=author_colors[author]) for author in unique_authors]
    plt.legend(handles, unique_authors, title="Authors")
    plt.tight_layout()
    plt.savefig('pr_duration_by_author.png')
    plt.close()

    # Plotting Average PR Review Time Over Time
    sorted_dates_indices = np.argsort(pr_created_dates)
    sorted_review_times = np.array(pr_review_times)[sorted_dates_indices]
    moving_avg_review_time = np.convolve(sorted_review_times, np.ones(10)/10, mode='valid')  # 10 PR moving average

    plt.figure(figsize=(12, 6))
    plt.plot(sorted_review_times, label='Review Time (Days)')
    plt.plot(range(len(moving_avg_review_time)), moving_avg_review_time, label='10 PR Moving Avg', color='red')
    plt.xlabel('PR Index (Sorted by Creation Date)')
    plt.ylabel('Review Time (Days)')
    plt.title('PR Review Time Trend')
    plt.legend()
    plt.tight_layout()
    plt.savefig('pr_review_time_trend.png')
    plt.close()
