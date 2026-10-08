{{ config(materialized='table') }}

SELECT *
FROM {{ ref('source') }}