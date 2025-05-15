"""Add ON DELETE CASCADE to workout_id

Revision ID: 4ee341d8e351
Revises: 212213722339
Create Date: 2025-05-15 23:34:20.223010

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4ee341d8e351'
down_revision: Union[str, None] = '212213722339'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
