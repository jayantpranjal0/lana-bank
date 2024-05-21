use crate::primitives::LedgerTxTemplateId;

use super::cala::graphql::*;

pub struct DepositTxTemplate {
    pub tx_template_id: LedgerTxTemplateId,
}

impl From<lava_deposit_tx_template_create::LavaDepositTxTemplateCreateTxTemplateCreate>
    for DepositTxTemplate
{
    fn from(
        tx_template_create: lava_deposit_tx_template_create::LavaDepositTxTemplateCreateTxTemplateCreate,
    ) -> Self {
        DepositTxTemplate {
            tx_template_id: LedgerTxTemplateId::from(tx_template_create.tx_template.tx_template_id),
        }
    }
}

pub struct WithdrawalTxTemplate {
    pub tx_template_id: LedgerTxTemplateId,
}

impl From<lava_withdrawal_tx_template_create::LavaWithdrawalTxTemplateCreateTxTemplateCreate>
    for WithdrawalTxTemplate
{
    fn from(
        tx_template_create: lava_withdrawal_tx_template_create::LavaWithdrawalTxTemplateCreateTxTemplateCreate,
    ) -> Self {
        WithdrawalTxTemplate {
            tx_template_id: LedgerTxTemplateId::from(tx_template_create.tx_template.tx_template_id),
        }
    }
}
