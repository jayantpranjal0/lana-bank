use sqlx::{PgPool, Postgres, Transaction};

use super::{entity::*, error::*};
use crate::{entity::*, primitives::*};

#[derive(Clone)]
pub(super) struct FixedTermLoanRepo {
    pool: PgPool,
}

impl FixedTermLoanRepo {
    pub fn new(pool: &PgPool) -> Self {
        Self { pool: pool.clone() }
    }

    pub async fn create_in_tx(
        &self,
        db: &mut Transaction<'_, Postgres>,
        new_loan: NewFixedTermLoan,
    ) -> Result<EntityUpdate<FixedTermLoan>, FixedTermLoanError> {
        sqlx::query!(
            r#"INSERT INTO fixed_term_loans (id, user_id)
            VALUES ($1, $2)"#,
            new_loan.id as FixedTermLoanId,
            new_loan.user_id as UserId,
        )
        .execute(&mut **db)
        .await?;
        let mut events = new_loan.initial_events();
        let n_new_events = events.persist(db).await?;
        let loan = FixedTermLoan::try_from(events)?;
        Ok(EntityUpdate {
            entity: loan,
            n_new_events,
        })
    }

    pub async fn find_by_id(
        &self,
        id: FixedTermLoanId,
    ) -> Result<FixedTermLoan, FixedTermLoanError> {
        let rows = sqlx::query_as!(
            GenericEvent,
            r#"SELECT l.id, e.sequence, e.event,
                      l.created_at AS entity_created_at, e.recorded_at AS event_recorded_at
            FROM fixed_term_loans l
            JOIN fixed_term_loan_events e ON l.id = e.id
            WHERE l.id = $1
            ORDER BY e.sequence"#,
            id as FixedTermLoanId,
        )
        .fetch_all(&self.pool)
        .await?;

        let res = EntityEvents::load_first::<FixedTermLoan>(rows)?;
        Ok(res)
    }

    pub async fn persist_in_tx(
        &self,
        db: &mut sqlx::Transaction<'_, sqlx::Postgres>,
        settings: &mut FixedTermLoan,
    ) -> Result<(), FixedTermLoanError> {
        settings.events.persist(db).await?;
        Ok(())
    }
}
