from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app import models  # Adjust this import based on your application structure

# This is the Alembic Config object, which provides access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
if config.config_file_name:
    fileConfig(config.config_file_name)

# Set up your models' metadata for 'autogenerate' support
target_metadata = models.Base.metadata  # Adjust 'Base' as per your models setup

# ... Other configurations from your Alembic .ini file or as needed

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("postgresql://postgres:8182@localhost/Bipindb10")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

# Determine the migration mode based on offline or online context
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
