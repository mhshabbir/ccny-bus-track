from collections import defaultdict
import matplotlib.pyplot as plt

def reviews_per_contributor(pull_requests):
    reviewers = defaultdict(int)

    for pr in pull_requests:
        reviews = pr.get_reviews()
        for review in reviews:
            reviewers[review.user.login] += 1

    names = list(reviewers.keys())
    counts = list(reviewers.values())

    plt.figure(figsize=(10, 6))
    plt.bar(names, counts, color='skyblue')
    plt.xlabel('Contributor')
    plt.ylabel('Number of Reviews')
    plt.title('PR Reviews by Contributor')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.close()
