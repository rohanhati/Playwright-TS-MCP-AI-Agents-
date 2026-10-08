{{ config(materialized='table') }}

SELECT
COUNT(*) AS total_orders,
SUM(amount) AS total_revenue,
AVG(amount) AS avg_order_value
FROM {{ ref('silver_orders') }}
WHERE status = 'Completed'