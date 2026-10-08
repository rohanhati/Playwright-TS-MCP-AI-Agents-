{{ config(materialized='table') }}

SELECT *
FROM {{ ref('bronze_orders') }}
WHERE amount IS NOT NULL
AND status IN ('Completed', 'Pending')