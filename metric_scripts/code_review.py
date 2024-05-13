from github import Github
import matplotlib.pyplot as plt
import numpy as np
import os

def get_pull_requests(repo):
    """Fetch all closed pull requests from the repository."""
    return list(repo.get_pulls(state='closed', base='main'))

def review_time(pull_requests):
    """Calculate review time for each PR (from creation to merge/close)."""
    times = []
    for pr in pull_requests:
        if pr.merged_at:
            times.append((pr.merged_at - pr.created_at).total_seconds() / 86400)  # Convert seconds to days
        elif pr.closed_at:  # Consider closed but not merged PRs
            times.append((pr.closed_at - pr.created_at).total_seconds() / 86400)
    return times

def time_to_first_review(pull_requests):
    """Calculate time to first review for each PR."""
    times = []
    for pr in pull_requests:
        reviews = pr.get_reviews()
        if reviews.totalCount > 0:
            first_review = min(reviews, key=lambda r: r.submitted_at)
            times.append((first_review.submitted_at - pr.created_at).total_seconds() / 86400)
    return times

def iterations_per_pr(pull_requests):
    """Calculate the number of commits (iterations) per PR."""
    return [pr.commits for pr in pull_requests]

def comments_per_pr(pull_requests):
    """Calculate the number of comments per PR."""
    return [pr.comments for pr in pull_requests]

def reviewer_participation(pull_requests):
    """Count unique reviewers per PR."""
    participation_counts = []
    for pr in pull_requests:
        reviewers = {review.user.login for review in pr.get_reviews()}
        participation_counts.append(len(reviewers))
    return participation_counts

def code_churn(pull_requests):
    """Calculate code churn (additions + deletions) per PR."""
    churns = []
    for pr in pull_requests:
        churn = sum((file.additions + file.deletions) for file in pr.get_files())
        churns.append(churn)
    return churns

def approval_time(pull_requests):
    """Calculate time from PR creation to first approval."""
    times = []
    for pr in pull_requests:
        approvals = [review for review in pr.get_reviews() if review.state == 'APPROVED']
        if approvals:
            first_approval = min(approvals, key=lambda a: a.submitted_at)
            times.append((first_approval.submitted_at - pr.created_at).total_seconds() / 86400)
    return times

def lines_of_code_per_review(pull_requests):
    """Calculate the total number of lines of code changed per PR."""
    lines_changed = []
    for pr in pull_requests:
        lines = sum(file.changes for file in pr.get_files())
        lines_changed.append(lines)
    return lines_changed

def cr_metrics(pull_requests):
    """Plot all metrics in a single figure with subplots, using dynamic x-positions."""
    
    # Define your metrics and titles here
    metrics_data = [
        review_time(pull_requests),
        time_to_first_review(pull_requests),
        iterations_per_pr(pull_requests),
        comments_per_pr(pull_requests),
        reviewer_participation(pull_requests),
        code_churn(pull_requests),
        approval_time(pull_requests),
        lines_of_code_per_review(pull_requests),
    ]
    
    titles = [
        'Review Time (Days)',
        'Time to First Review (Days)',
        'Number of Iterations',
        'Comments per PR',
        'Reviewer Participation',
        'Code Churn',
        'Approval Time (Days)',
        'Lines of Code per Review',
    ]
    
    ylabels = [
        'Days',
        'Days',
        'Iterations',
        'Comments',
        'Reviewers',
        'Lines of Code',
        'Days',
        'Lines of Code',
    ]
    
    # Calculate the number of rows needed for the subplots
    nrows = int(np.ceil(len(metrics_data) / 2))
    
    # Set up the subplots
    fig, axs = plt.subplots(nrows, 2, figsize=(15, nrows * 5))
    fig.suptitle('GitHub Repository Metrics', fontsize=16)
    
    # Flatten the axes array for easy iteration
    axs = axs.flatten()
    
    # Iterate through each metric for plotting
    for i, data in enumerate(metrics_data):
        x_positions = np.arange(len(data))
        axs[i].bar(x_positions, data, alpha=0.75)
        axs[i].set_title(titles[i])
        axs[i].set_ylabel(ylabels[i])
        axs[i].set_xticks(x_positions)
        axs[i].set_xticklabels([f'PR {j+1}' for j in x_positions], rotation=90)
        
        # Hide any unused subplots if the number of metrics is odd
        if i >= len(metrics_data):
            axs[i].set_visible(False)

    # Adjust the layout
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    
    # Save the figure before showing it
    plt.savefig('cr_metrics.png')
    plt.show()
    plt.close()