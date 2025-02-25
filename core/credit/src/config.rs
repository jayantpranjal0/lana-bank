use serde::{Deserialize, Serialize};

use crate::terms::CVLPct;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CreditFacilityConfig {
    #[serde(default = "default_upgrade_buffer_cvl_pct")]
    pub upgrade_buffer_cvl_pct: CVLPct,
    #[serde(default = "default_customer_active_check_enabled")]
    pub customer_active_check_enabled: bool,
}

impl Default for CreditFacilityConfig {
    fn default() -> Self {
        CreditFacilityConfig {
            upgrade_buffer_cvl_pct: default_upgrade_buffer_cvl_pct(),
            customer_active_check_enabled: true,
        }
    }
}

fn default_upgrade_buffer_cvl_pct() -> CVLPct {
    CVLPct::new(5)
}

fn default_customer_active_check_enabled() -> bool {
    true
}
