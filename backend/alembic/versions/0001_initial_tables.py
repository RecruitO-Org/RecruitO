"""initial tables

Revision ID: 0001_initial_tables
Revises:
Create Date: 2026-09-03
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "0001_initial_tables"
down_revision = None
branch_labels = None
depends_on = None

# Named PostgreSQL enum types. SQLAlchemy emits each named type exactly once
# within the migration transaction, so no explicit .create() is required.
_roleenum = sa.Enum(
    "user", "admin", "company", name="roleenum"
)
_jobstatus = sa.Enum("open", "closed", name="jobstatusenum")
_appstatus = sa.Enum(
    "applied",
    "shortlisted",
    "interviewed",
    "accepted",
    "rejected",
    "withdrawn",
    name="applicationstatusenum",
)
_intervstatus = sa.Enum(
    "scheduled", "completed", "cancelled", name="interviewstatusenum"
)


def upgrade() -> None:
    # --- users ---
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("password", sa.String(), nullable=False),
        sa.Column("role", _roleenum, nullable=False),
        sa.Column("phone", sa.String(), nullable=True),
        sa.Column("category", sa.String(), nullable=True),
        sa.Column("skills", sa.JSON(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column(
            "created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False
        ),
    )
    op.create_index("ix_users_id", "users", ["id"])
    op.create_index("ix_users_email", "users", ["email"], unique=True)

    # --- companies ---
    op.create_table(
        "companies",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id"),
            nullable=False,
        ),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("website", sa.String(), nullable=True),
        sa.Column("registration_number", sa.String(), nullable=True),
        sa.Column("industry", sa.String(), nullable=True),
        sa.Column("location", sa.String(), nullable=True),
        sa.Column("size", sa.String(), nullable=True),
        sa.Column("about", sa.Text(), nullable=True),
        sa.Column("logo_url", sa.String(), nullable=True),
        sa.Column("approved", sa.Boolean(), nullable=False),
        sa.Column(
            "created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False
        ),
    )
    op.create_index("ix_companies_id", "companies", ["id"])
    op.create_index("ix_companies_user_id", "companies", ["user_id"], unique=True)

    # --- jobs ---
    op.create_table(
        "jobs",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "company_id",
            sa.Integer(),
            sa.ForeignKey("companies.id"),
            nullable=False,
        ),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("department", sa.String(), nullable=True),
        sa.Column("location", sa.String(), nullable=True),
        sa.Column("type", sa.String(), nullable=True),
        sa.Column("experience", sa.String(), nullable=True),
        sa.Column("salary", sa.String(), nullable=True),
        sa.Column("skills", sa.JSON(), nullable=True),
        sa.Column("vacancies", sa.Integer(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("deadline", sa.Date(), nullable=True),
        sa.Column("status", _jobstatus, nullable=False),
        sa.Column(
            "posted_on", sa.DateTime(), server_default=sa.func.now(), nullable=False
        ),
    )
    op.create_index("ix_jobs_id", "jobs", ["id"])
    op.create_index("ix_jobs_company_id", "jobs", ["company_id"])

    # --- resumes ---
    op.create_table(
        "resumes",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id"),
            nullable=False,
        ),
        sa.Column("original_filename", sa.String(), nullable=False),
        sa.Column("stored_path", sa.String(), nullable=False),
        sa.Column("extension", sa.String(), nullable=True),
        sa.Column("parsed_text", sa.Text(), nullable=True),
        sa.Column(
            "uploaded_at", sa.DateTime(), server_default=sa.func.now(), nullable=False
        ),
    )
    op.create_index("ix_resumes_id", "resumes", ["id"])
    op.create_index("ix_resumes_user_id", "resumes", ["user_id"])

    # --- applications ---
    op.create_table(
        "applications",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "job_id", sa.Integer(), sa.ForeignKey("jobs.id"), nullable=False
        ),
        sa.Column(
            "user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False
        ),
        sa.Column("status", _appstatus, nullable=False),
        sa.Column("match_score", sa.Integer(), nullable=True),
        sa.Column(
            "created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False
        ),
        sa.UniqueConstraint("job_id", "user_id", name="uq_application_job_user"),
    )
    op.create_index("ix_applications_id", "applications", ["id"])
    op.create_index("ix_applications_job_id", "applications", ["job_id"])
    op.create_index("ix_applications_user_id", "applications", ["user_id"])

    # --- interviews ---
    op.create_table(
        "interviews",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "application_id",
            sa.Integer(),
            sa.ForeignKey("applications.id"),
            nullable=False,
        ),
        sa.Column(
            "job_id", sa.Integer(), sa.ForeignKey("jobs.id"), nullable=False
        ),
        sa.Column(
            "user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False
        ),
        sa.Column("scheduled_at", sa.DateTime(), nullable=True),
        sa.Column("status", _intervstatus, nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("score", sa.Integer(), nullable=True),
        sa.Column(
            "created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False
        ),
    )
    op.create_index("ix_interviews_id", "interviews", ["id"])
    op.create_index(
        "ix_interviews_application_id", "interviews", ["application_id"], unique=True
    )
    op.create_index("ix_interviews_job_id", "interviews", ["job_id"])
    op.create_index("ix_interviews_user_id", "interviews", ["user_id"])


def downgrade() -> None:
    op.drop_index("ix_interviews_user_id", table_name="interviews")
    op.drop_index("ix_interviews_job_id", table_name="interviews")
    op.drop_index("ix_interviews_application_id", table_name="interviews")
    op.drop_index("ix_interviews_id", table_name="interviews")
    op.drop_table("interviews")

    op.drop_index("ix_applications_user_id", table_name="applications")
    op.drop_index("ix_applications_job_id", table_name="applications")
    op.drop_index("ix_applications_id", table_name="applications")
    op.drop_table("applications")

    op.drop_index("ix_resumes_user_id", table_name="resumes")
    op.drop_index("ix_resumes_id", table_name="resumes")
    op.drop_table("resumes")

    op.drop_index("ix_jobs_company_id", table_name="jobs")
    op.drop_index("ix_jobs_id", table_name="jobs")
    op.drop_table("jobs")

    op.drop_index("ix_companies_user_id", table_name="companies")
    op.drop_index("ix_companies_id", table_name="companies")
    op.drop_table("companies")

    op.drop_index("ix_users_email", table_name="users")
    op.drop_index("ix_users_id", table_name="users")
    op.drop_table("users")

    sa.Enum(name="interviewstatusenum").drop(op.get_bind(), checkfirst=True)
    sa.Enum(name="applicationstatusenum").drop(op.get_bind(), checkfirst=True)
    sa.Enum(name="jobstatusenum").drop(op.get_bind(), checkfirst=True)
    sa.Enum(name="roleenum").drop(op.get_bind(), checkfirst=True)
