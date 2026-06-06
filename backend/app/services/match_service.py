import re


def normalize(text):
    return re.sub(
        r"[^a-z0-9 ]",
        " ",
        text.lower()
    )


SKILL_ALIASES = {
    "AWS": [
        "aws",
        "amazon web services"
    ],

    "Terraform": [
        "terraform"
    ],

    "Kubernetes": [
        "kubernetes",
        "eks",
        "elastic kubernetes service"
    ],

    "Docker": [
        "docker",
        "container"
    ],

    "GitLab": [
        "gitlab",
        "gitlab ci"
    ],

    "GitHub Actions": [
        "github actions"
    ],

    "CloudFormation": [
        "cloudformation"
    ],

    "Helm": [
        "helm"
    ],

    "ArgoCD": [
        "argocd",
        "argo cd"
    ],

    "EKS": [
        "eks"
    ],

    "ECS": [
        "ecs",
        "elastic container service",
        "fargate"
    ],

    "Lambda": [
        "lambda",
        "aws lambda"
    ],

    "Python": [
        "python"
    ],

    "Linux": [
        "linux"
    ],

    "CI/CD": [
        "ci cd",
        "cicd",
        "continuous integration",
        "continuous delivery",
        "continuous deployment"
    ]
}


SKILL_WEIGHTS = {
    "AWS": 10,
    "Terraform": 10,
    "Kubernetes": 10,
    "Docker": 8,
    "GitLab": 8,
    "GitHub Actions": 7,
    "CloudFormation": 7,
    "Helm": 6,
    "ArgoCD": 6,
    "EKS": 6,
    "ECS": 6,
    "Lambda": 5,
    "Python": 5,
    "Linux": 5,
    "CI/CD": 8
}


def calculate_match(
    resume_skills,
    job_title,
    job_description
):

    job_text = normalize(
        f"{job_title} {job_description}"
    )

    matched_skills = []
    missing_skills = []

    total_weight = sum(
        SKILL_WEIGHTS.values()
    )

    matched_weight = 0

    for skill, aliases in SKILL_ALIASES.items():

        found = False

        for alias in aliases:

            if normalize(alias) in job_text:

                found = True
                break

        if found:

            matched_skills.append(skill)

            matched_weight += (
                SKILL_WEIGHTS.get(skill, 1)
            )

        else:

            missing_skills.append(skill)

    match_score = int(
        (matched_weight / total_weight)
        * 100
    )

    return {
        "match_score": match_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills[:10]
    }