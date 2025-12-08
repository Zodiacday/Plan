# 🔧 Database Migration - Step by Step

## ⚠️ What Happened

Your database currently has the **OLD schema** with integer IDs.
The new code expects **UUID** IDs and different field names.

**Current schema:** `id` (integer), `category_slug`, `url`, `section`  
**New schema:** `id` (UUID), `category_id`, `website_url`, `category_group`

## 📋 Migration Steps

Go to Supabase SQL Editor and run these files **IN ORDER**:

### Step 1: Drop Old Tables
```
Open: database/step1-drop-old.sql
Copy ALL → Paste in Supabase → RUN
```
This removes all old tables.

### Step 2: Create New Tables  
```
Open: database/step2-create-tables.sql
Copy ALL → Paste in Supabase → RUN
```
This creates tables with UUID IDs.

### Step 3: Add Indexes & Triggers
```
Open: database/step3-indexes-triggers.sql
Copy ALL → Paste in Supabase → RUN
```
This adds performance indexes and auto-counting triggers.

### Step 4: Insert Data
```
Open: database/step4-insert-data.sql
Copy ALL → Paste in Supabase → RUN
```
This adds 21 categories and 6 sample tools.

## ✅ Verification

After Step 4, you should see:
```
Categories: 21
Tools: 6
```

## 🚀 Then Refresh Your Site

Visit: http://localhost:3000

Everything will work perfectly!

## 🆘 If Something Goes Wrong

Just re-run all 4 steps from the beginning.
Step 1 cleans everything up first.
