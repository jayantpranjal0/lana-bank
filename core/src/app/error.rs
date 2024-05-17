use thiserror::Error;

#[derive(Error, Debug)]
pub enum ApplicationError {
    #[error("ApplicationError - Sqlx: {0}")]
    Sqlx(#[from] sqlx::Error),
    #[error("ApplicationError - JobError: {0}")]
    JobError(#[from] crate::job::error::JobError),
    #[error("ApplicationError - LedgerError: {0}")]
    LedgerError(#[from] crate::ledger::error::LedgerError),
}
