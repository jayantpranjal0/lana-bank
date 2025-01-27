{{ config(materialized='table') }}

select
    cast(`dias_mora_k` as string) as `dias_mora_k`,
    cast(`dias_mora_i` as string) as `dias_mora_i`,
    cast(`periodo_gracia_k` as string) as `periodo_gracia_k`,
    cast(`periodo_gracia_i` as string) as `periodo_gracia_i`,
    cast(`pais_destino_credito` as string) as `pais_destino_credito`,
    cast(`dias_prorroga` as string) as `dias_prorroga`,
    cast(`dia_pago_k` as string) as `dia_pago_k`,
    cast(`dia_pago_i` as string) as `dia_pago_i`,
    cast(`cuota_mora_k` as string) as `cuota_mora_k`,
    cast(`cuota_mora_i` as string) as `cuota_mora_i`,
    cast(`plazo_credito` as string) as `plazo_credito`,
    left(replace(nit_deudor, '-', ''), 14) as `nit_deudor`,
    left(`cod_cartera`, 2) as `cod_cartera`,
    left(`cod_activo`, 2) as `cod_activo`,
    left(`num_referencia`, 20) as `num_referencia`,
    format('%.2f', round(`monto_referencia`, 2)) as `monto_referencia`,
    format('%.2f', round(`saldo_referencia`, 2)) as `saldo_referencia`,
    format('%.2f', round(`saldo_vigente_k`, 2)) as `saldo_vigente_k`,
    format('%.2f', round(`saldo_vencido_k`, 2)) as `saldo_vencido_k`,
    format('%.2f', round(`saldo_vigente_i`, 2)) as `saldo_vigente_i`,
    format('%.2f', round(`saldo_vencido_i`, 2)) as `saldo_vencido_i`,
    format('%.2f', round(`abono_deposito`, 2)) as `abono_deposito`,
    format_date('%Y-%m-%d', cast(`fecha_otorgamiento` as date))
        as `fecha_otorgamiento`,
    format_date('%Y-%m-%d', cast(`fecha_vencimiento` as date))
        as `fecha_vencimiento`,
    format_date('%Y-%m-%d', cast(`fecha_castigo` as date)) as `fecha_castigo`,
    left(`estado_credito`, 1) as `estado_credito`,
    format('%.2f', round(`saldo_mora_k`, 2)) as `saldo_mora_k`,
    format('%.2f', round(`saldo_mora_i`, 2)) as `saldo_mora_i`,
    format_date('%Y-%m-%d', cast(`fecha_inicio_mora_k` as date))
        as `fecha_inicio_mora_k`,
    format_date('%Y-%m-%d', cast(`fecha_inicio_mora_i` as date))
        as `fecha_inicio_mora_i`,
    left(`pago_capital`, 1) as `pago_capital`,
    left(`pago_interes`, 1) as `pago_interes`,
    left(`garante`, 10) as `garante`,
    left(`emisión`, 15) as `emisión`,
    left(`destino`, 6) as `destino`,
    left(`codigo_moneda`, 1) as `codigo_moneda`,
    format('%.2f', round(`tasa_interes`, 2)) as `tasa_interes`,
    format('%.2f', round(`tasa_contractual`, 2)) as `tasa_contractual`,
    format('%.2f', round(`tasa_referencia`, 2)) as `tasa_referencia`,
    format('%.2f', round(`tasa_efectiva`, 2)) as `tasa_efectiva`,
    left(`tipo_tasa_interes`, 1) as `tipo_tasa_interes`,
    left(`tipo_prestamo`, 2) as `tipo_prestamo`,
    left(`codigo_recurso`, 2) as `codigo_recurso`,
    format_date('%Y-%m-%d', cast(`ultima_fecha_venc` as date))
        as `ultima_fecha_venc`,
    format('%.2f', round(`monto_desembolsado`, 2)) as `monto_desembolsado`,
    left(`tipo_credito`, 2) as `tipo_credito`,
    format_date('%Y-%m-%d', cast(`fecha_ultimo_pago_k` as date))
        as `fecha_ultimo_pago_k`,
    format_date('%Y-%m-%d', cast(`fecha_ultimo_pago_i` as date))
        as `fecha_ultimo_pago_i`,
    format('%.2f', round(`monto_cuota`, 2)) as `monto_cuota`,
    left(`cuenta_contable_k`, 12) as `cuenta_contable_k`,
    left(`cuenta_contable_i`, 12) as `cuenta_contable_i`,
    format_date('%Y-%m-%d', cast(`fecha_cancelacion` as date))
        as `fecha_cancelacion`,
    format('%.2f', round(`adelanto_capital`, 2)) as `adelanto_capital`,
    format('%.2f', round(`riesgo_neto`, 2)) as `riesgo_neto`,
    format('%.2f', round(`saldo_seguro`, 2)) as `saldo_seguro`,
    format('%.2f', round(`saldo_costas_procesales`, 2))
        as `saldo_costas_procesales`,
    left(`tipo_tarjeta_credito`, 1) as `tipo_tarjeta_credito`,
    left(`clase_tarjeta_credito`, 1) as `clase_tarjeta_credito`,
    left(`producto_tarjeta_credito`, 20) as `producto_tarjeta_credito`,
    format('%.2f', round(`valor_garantia_cons`, 2)) as `valor_garantia_cons`,
    left(`municipio_otorgamiento`, 4) as `municipio_otorgamiento`,
    format('%.2f', round(`reserva_referencia`, 2)) as `reserva_referencia`,
    left(`etapa_judicial`, 1) as `etapa_judicial`,
    format_date('%Y-%m-%d', cast(`fecha_demanda` as date)) as `fecha_demanda`,
    left(`orden_descuento`, 2) as `orden_descuento`,
    left(`categoria_riesgo_ref`, 2) as `categoria_riesgo_ref`,
    format('%.2f', round(`reserva_constituir`, 2)) as `reserva_constituir`,
    format('%.2f', round(`porcentaje_reserva`, 2)) as `porcentaje_reserva`,
    format('%.2f', round(`pago_cuota`, 2)) as `pago_cuota`,
    format_date('%Y-%m-%d', cast(`fecha_pago` as date)) as `fecha_pago`,
    format('%.2f', round(`porcenta_reserva_descon`, 2))
        as `porcenta_reserva_descon`,
    format('%.2f', round(`porcenta_adiciona_descon`, 2))
        as `porcenta_adiciona_descon`,
    left(`depto_destino_credito`, 2) as `depto_destino_credito`,
    format('%.2f', round(`porc_reserva_referencia`, 2))
        as `porc_reserva_referencia`,
    format('%.2f', round(`calculo_brecha`, 2)) as `calculo_brecha`,
    format('%.2f', round(`ajuste_brecha`, 2)) as `ajuste_brecha`,
    left(`programa_asist_cafe`, 2) as `programa_asist_cafe`,
    format_date('%Y-%m-%d', cast(`fecha_cump_cafe` as date))
        as `fecha_cump_cafe`,
    current_timestamp() as created_at
from
    {{ ref('int_npb4_17_02_referencia_xml_raw') }}
