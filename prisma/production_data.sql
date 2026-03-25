pg_dump: warning: there are circular foreign-key constraints on this table:
pg_dump: detail: BudgetType
pg_dump: hint: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
pg_dump: hint: Consider using a full dump instead of a --data-only dump to avoid this problem.
pg_dump: warning: there are circular foreign-key constraints on this table:
pg_dump: detail: BalanceReportTemplate
pg_dump: hint: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
pg_dump: hint: Consider using a full dump instead of a --data-only dump to avoid this problem.
--
-- PostgreSQL database dump
--

\restrict rFr1u0cmP0BbdCCWdc01u8HqYbcmRwZ4J1i3wHfL58ciQzzLubQSGZtZnbtVv9c

-- Dumped from database version 16.12
-- Dumped by pg_dump version 16.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."User" (id, username, "passwordHash", "fullName", "position", role, "lineUserId", "isActive", "createdAt", "updatedAt") VALUES (1, 'teacher1', '$2b$10$svMNcMWrEU0/HCzHAl8qY.Hryi9fVxNwKxu8BNJvgKQloY4rAmnNC', 'นายสมชาย ใจดี', 'ครู', 'TEACHER', NULL, true, '2026-03-20 02:36:14.198', '2026-03-20 02:36:14.198');
INSERT INTO public."User" (id, username, "passwordHash", "fullName", "position", role, "lineUserId", "isActive", "createdAt", "updatedAt") VALUES (3, 'suttida', '$2b$10$Unsul5ZY3Gfr36vxIIsR7OGrVbnnlQ0WXKWxuK6jL8dDEvBcbxWOW', 'นางสาวสุทธิดา สุทธิ', 'รองผู้อำนวยการโรงเรียน', 'VICE_PRINCIPAL', NULL, true, '2026-03-20 02:36:14.221', '2026-03-20 02:36:14.221');
INSERT INTO public."User" (id, username, "passwordHash", "fullName", "position", role, "lineUserId", "isActive", "createdAt", "updatedAt") VALUES (4, 'wipapan', '$2b$10$mIb6UxkjFFrD4VGqT56Z0uyLhLJdZzO7gZ8qP5ZxVANGs/iCzmObG', 'นางสาววิภาพรรณ อุบล', 'ผู้อำนวยการโรงเรียน', 'PRINCIPAL', NULL, true, '2026-03-20 02:36:14.224', '2026-03-20 02:36:14.224');
INSERT INTO public."User" (id, username, "passwordHash", "fullName", "position", role, "lineUserId", "isActive", "createdAt", "updatedAt") VALUES (2, 'montira', '$2b$10$GCujDQFg.afLauuwKu1uEeETpyDSJ129I/oXtwvaN6R7BaLcgYx6W', 'นางมณฑิรา สายยศ', 'ครูชำนาญการพิเศษ', 'FINANCE_OFFICER', NULL, true, '2026-03-20 02:36:14.217', '2026-03-25 11:34:21.368');
INSERT INTO public."User" (id, username, "passwordHash", "fullName", "position", role, "lineUserId", "isActive", "createdAt", "updatedAt") VALUES (5, 'admin', '$2b$10$qURpLXu0m9i8sVKV1nnKFuhbTLfEuywW6FNyvxt2EOQB.jnBlvkIO', 'ผู้ดูแลระบบ', 'ผู้ดูแลระบบ', 'ADMIN', NULL, true, '2026-03-20 02:36:14.227', '2026-03-25 11:34:21.427');


--
-- Data for Name: ApprovalRequest; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (2, 1, 2569, '2025-10-03 00:00:00', NULL, 59088.72, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.018', '2026-03-24 12:34:18.018', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (3, 2, 2569, '2025-10-10 00:00:00', NULL, 121260, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.091', '2026-03-24 12:34:18.091', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (4, 3, 2569, '2025-10-31 00:00:00', NULL, 45000, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.097', '2026-03-24 12:34:18.097', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (5, 4, 2569, '2025-11-07 00:00:00', NULL, 67893, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.102', '2026-03-24 12:34:18.102', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (6, 5, 2569, '2025-11-07 00:00:00', NULL, 341010, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.11', '2026-03-24 12:34:18.11', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (7, 6, 2569, '2025-11-14 00:00:00', NULL, 83007.15, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.122', '2026-03-24 12:34:18.122', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (8, 7, 2569, '2025-11-21 00:00:00', NULL, 67465, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.13', '2026-03-24 12:34:18.13', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (9, 8, 2569, '2025-11-28 00:00:00', NULL, 305793, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.136', '2026-03-24 12:34:18.136', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (10, 9, 2569, '2025-12-04 00:00:00', NULL, 78500.25, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.144', '2026-03-24 12:34:18.144', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (11, 10, 2569, '2025-12-12 00:00:00', NULL, 58300, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.15', '2026-03-24 12:34:18.15', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (12, 11, 2569, '2025-12-19 00:00:00', NULL, 135446.77, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.155', '2026-03-24 12:34:18.155', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (13, 12, 2569, '2025-12-26 00:00:00', NULL, 110100, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.164', '2026-03-24 12:34:18.164', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (14, 13, 2569, '2026-01-09 00:00:00', NULL, 101925, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.171', '2026-03-24 12:34:18.171', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (15, 14, 2569, '2026-01-15 00:00:00', NULL, 46728, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.177', '2026-03-24 12:34:18.177', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (16, 15, 2569, '2026-01-23 00:00:00', NULL, 86982.29, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.182', '2026-03-24 12:34:18.182', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (17, 16, 2569, '2026-01-30 00:00:00', NULL, 145460, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.19', '2026-03-24 12:34:18.19', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (18, 17, 2569, '2026-02-06 00:00:00', NULL, 64203, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.197', '2026-03-24 12:34:18.197', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (19, 18, 2569, '2026-02-13 00:00:00', NULL, 60812, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.202', '2026-03-24 12:34:18.202', NULL);
INSERT INTO public."ApprovalRequest" (id, "sequenceNumber", "fiscalYear", "requestDate", "memoNumber", "totalAmount", note, "currentStep", status, "createdById", "createdAt", "updatedAt", "docSignatories") VALUES (1, 1, 2569, '2026-02-13 00:00:00', NULL, 60812, NULL, 4, 'WITHDRAWN', 2, '2026-03-20 03:29:39.108', '2026-03-25 10:15:41.391', NULL);


--
-- Data for Name: BalanceReport; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: BankAccount; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."BankAccount" (id, "bankName", "accountNumber", "accountName", branch, "accountType", "isActive", "createdAt", "updatedAt") VALUES (3, 'ธนาคารออมสิน', '050461166014', 'เงินโครงการอาหารกลางวันโรงเรียนวัดบ้านดอน', 'ระยอง', 'SAVINGS', true, '2026-03-19 15:18:09.825', '2026-03-19 15:18:09.825');
INSERT INTO public."BankAccount" (id, "bankName", "accountNumber", "accountName", branch, "accountType", "isActive", "createdAt", "updatedAt") VALUES (4, 'ธนาคารกรุงไทย', '2180647115', 'เงินอุดหนุนจากเทศบาล ต.เชิงเนิน', 'ระยอง', 'SAVINGS', true, '2026-03-19 15:21:46.079', '2026-03-19 15:21:46.079');
INSERT INTO public."BankAccount" (id, "bankName", "accountNumber", "accountName", branch, "accountType", "isActive", "createdAt", "updatedAt") VALUES (5, 'ธนาคารกรุงไทย', '2180647107', 'เงินอุดหนุนโรงเรียนวัดบ้านดอน', 'ระยอง', 'SAVINGS', true, '2026-03-19 15:40:51.916', '2026-03-19 15:40:51.916');
INSERT INTO public."BankAccount" (id, "bankName", "accountNumber", "accountName", branch, "accountType", "isActive", "createdAt", "updatedAt") VALUES (6, 'ธนาคารกรุงไทย', '6777072047', 'กสศ.เพื่อโรงเรียนวัดบ้านดอน', 'เซ็นทรัลพลาซ่า ระยอง', 'SAVINGS', true, '2026-03-19 15:44:11.114', '2026-03-19 15:44:11.114');
INSERT INTO public."BankAccount" (id, "bankName", "accountNumber", "accountName", branch, "accountType", "isActive", "createdAt", "updatedAt") VALUES (7, 'ธนาคารกรุงไทย', '2180363133', 'เงินอุกหนุนโครงการอาหารกลางวันโรงเรียนวัดบ้านดอน', 'ระยอง', 'SAVINGS', true, '2026-03-19 15:46:20.832', '2026-03-19 15:46:20.832');
INSERT INTO public."BankAccount" (id, "bankName", "accountNumber", "accountName", branch, "accountType", "isActive", "createdAt", "updatedAt") VALUES (8, 'ธนาคารกรุงไทย', '2180571240', 'เงินรายได้สถานศึกษาโรงเรียนวัดบ้านดอน', 'ระยอง', 'SAVINGS', true, '2026-03-19 15:49:44.528', '2026-03-19 15:49:44.528');


--
-- Data for Name: BudgetType; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (8, 'เงินหักภาษี ณ ที่จ่าย', 'WITHHOLDING_TAX', 'NON_BUDGET', NULL, NULL, true, 12);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (1, 'เงินอุดหนุนทั่วไป', 'GENERAL_SUBSIDY', 'BUDGET', NULL, 5, true, 1);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (2, 'เงินอุดหนุนปัจจัยพื้นฐานนักเรียนยากจน', 'SupportLine', 'BUDGET', NULL, 5, true, 2);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (3, 'เงินอุดหนุนเทศบาล', 'MUNICIPALITY', 'NON_BUDGET', NULL, NULL, false, 3);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (4, 'เงินเรียนฟรี 15 ปี', 'FREE_EDUCATION', 'BUDGET', NULL, 5, true, 4);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (9, 'เงินเรียนฟรี15 ปี (กิจกรรมพัฒนาคุณภาพผู้เรียน)', 'FREE_EDU_Quality', 'BUDGET', 4, 5, true, 5);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (10, 'เงินเรียนฟรี15 ปี (ค่าหนังสือเรียน)', 'FREE_EDU_TBOOK', 'BUDGET', 4, 5, true, 6);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (11, 'เงินเรียนฟรี15 ปี (ค่าเครื่องแบบนักเรียน)', 'FREE_EDU_UNIFORM', 'BUDGET', 4, 5, true, 7);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (12, 'เงินเรียนฟรี15 ปี (ค่าอุปกรณ์การเรียน)', 'FREE_EDU_EQUIP', 'BUDGET', 4, 5, true, 8);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (5, 'เงินกองทุนเพื่อความเสมอภาคทางการศึกษา', 'EEF', 'BUDGET', NULL, 6, true, 9);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (6, 'เงินอุดหนุนโครงการอาหารกลางวัน', 'SCHOOL_LUNCHFOOD', 'BUDGET', NULL, 7, true, 10);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (13, 'เงินรายได้สถานศึกษา', 'SCHOLL_INCOME', 'NON_BUDGET', NULL, 8, true, 0);
INSERT INTO public."BudgetType" (id, name, code, category, "parentId", "bankAccountId", "isActive", "sortOrder") VALUES (7, 'เงินอุดหนุนเทศบาล1', 'MUNICIPAL _SUPPORT1', 'BUDGET', NULL, 4, true, 11);


--
-- Data for Name: BalanceEntry; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: BalanceReportIssued; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."BalanceReportIssued" (id, "reportDate", "fiscalYear", "issuedAt", "issuedById", signatories) VALUES (1, '2026-03-19 00:00:00', 2569, '2026-03-21 07:22:37.113', 2, NULL);
INSERT INTO public."BalanceReportIssued" (id, "reportDate", "fiscalYear", "issuedAt", "issuedById", signatories) VALUES (2, '2025-12-31 00:00:00', 2569, '2026-03-21 07:27:02.976', 2, NULL);
INSERT INTO public."BalanceReportIssued" (id, "reportDate", "fiscalYear", "issuedAt", "issuedById", signatories) VALUES (3, '2025-10-03 00:00:00', 2569, '2026-03-25 08:57:59.576', 5, NULL);


--
-- Data for Name: BalanceReportTemplate; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (1, 'ดอกเบี้ยเงินฝากเงินอุดหนุนทั่วไป', 'BUDGET_REVENUE', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 1, true, '2026-03-21 07:02:26.226', '2026-03-21 07:02:26.226');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (2, 'ดอกเบี้ยบัญชีเงินฝากเงินโครงการอาหารกลางวัน', 'BUDGET_REVENUE', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 2, true, '2026-03-21 07:02:26.236', '2026-03-21 07:02:26.236');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (3, 'ดอกเบี้ยเงินโครงการจ้างครูฯ', 'BUDGET_REVENUE', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 3, true, '2026-03-21 07:02:26.238', '2026-03-21 07:02:26.238');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (4, 'ดอกเบี้ยเงิน กสศ.เพื่อโรงเรียนวัดบ้านดอน', 'BUDGET_REVENUE', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 4, true, '2026-03-21 07:02:26.24', '2026-03-21 07:02:26.24');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (5, 'เงินอุดหนุนค่าใช้จ่ายในการจัดการศึกษาขั้นพื้นฐาน', 'NON_BUDGET', NULL, 'BANK', 'BUDGET_TYPE', NULL, 1, 0, 5, true, '2026-03-21 07:02:26.242', '2026-03-21 07:02:26.242');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (6, 'เงินอุดหนุนปัจจัยพื้นฐานสำหรับนักเรียนยากจนฯ', 'NON_BUDGET', NULL, 'BANK', 'BUDGET_TYPE', NULL, 2, 0, 6, true, '2026-03-21 07:02:26.246', '2026-03-21 07:02:26.246');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (7, 'เงินเรียนฟรี 15 ปี', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 7, true, '2026-03-21 07:02:26.248', '2026-03-21 07:02:26.248');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (8, 'ค่าอุปกรณ์การเรียน', 'NON_BUDGET', 7, 'BANK', 'BUDGET_TYPE', NULL, 12, 0, 8, true, '2026-03-21 07:02:26.251', '2026-03-21 07:02:26.251');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (9, 'ค่าเครื่องแบบนักเรียน', 'NON_BUDGET', 7, 'BANK', 'BUDGET_TYPE', NULL, 11, 0, 9, true, '2026-03-21 07:02:26.253', '2026-03-21 07:02:26.253');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (10, 'ค่ากิจกรรมพัฒนาคุณภาพผู้เรียน', 'NON_BUDGET', 7, 'BANK', 'BUDGET_TYPE', NULL, 9, 0, 10, true, '2026-03-21 07:02:26.256', '2026-03-21 07:02:26.256');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (11, 'ค่าหนังสือเรียน', 'NON_BUDGET', 7, 'BANK', 'BUDGET_TYPE', NULL, 10, 0, 11, true, '2026-03-21 07:02:26.258', '2026-03-21 07:02:26.258');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (12, 'เงินธุรการโรงเรียน', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 12, true, '2026-03-21 07:02:26.26', '2026-03-21 07:02:26.26');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (13, 'เงินสนับสนุนค่าใช้จ่ายด้านการศึกษาเพื่อลดภาระฯ', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 13, true, '2026-03-21 07:02:26.261', '2026-03-21 07:02:26.261');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (14, 'เงิน กสศ.เพื่อโรงเรียนวัดบ้านดอน', 'NON_BUDGET', NULL, 'BANK', 'BUDGET_TYPE', NULL, 5, 0, 14, true, '2026-03-21 07:02:26.263', '2026-03-21 07:02:26.263');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (15, 'เงินงบประมาณที่ได้รับการสนับสนุนจากเทศบาลฯ', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 15, true, '2026-03-21 07:02:26.265', '2026-03-21 07:02:26.265');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (16, 'เงินโครงการอาหารกลางวัน', 'NON_BUDGET', 15, 'BANK', 'BUDGET_TYPE', NULL, 6, 0, 16, true, '2026-03-21 07:02:26.269', '2026-03-21 07:02:26.269');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (17, 'เงินโครงการจ้างครูฯ', 'NON_BUDGET', 15, 'BANK', 'MANUAL', NULL, NULL, 0, 17, true, '2026-03-21 07:02:26.271', '2026-03-21 07:02:26.271');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (18, 'เงินโครงการอาหารกลางวัน(ธ.ออมสิน)', 'NON_BUDGET', NULL, 'BANK', 'BANK_ACCOUNT', 3, NULL, 0, 18, true, '2026-03-21 07:02:26.273', '2026-03-21 07:02:26.273');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (19, 'เงินรายได้สถานศึกษา', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 19, true, '2026-03-21 07:02:26.276', '2026-03-21 07:02:26.276');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (20, 'เงินรายได้สถานศึกษา(ระบุวัตถุประสงค์)', 'NON_BUDGET', 19, 'BANK', 'MANUAL', NULL, NULL, 0, 20, true, '2026-03-21 07:02:26.279', '2026-03-21 07:02:26.279');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (21, 'เงินรายได้สถานศึกษา(ไม่ระบุวัตถุประสงค์)', 'NON_BUDGET', 19, 'BANK', 'MANUAL', NULL, NULL, 0, 21, true, '2026-03-21 07:02:26.281', '2026-03-21 07:02:26.281');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (22, 'เงินประกันสัญญา', 'NON_BUDGET', NULL, 'DEPT', 'MANUAL', NULL, NULL, 0, 22, true, '2026-03-21 07:02:26.282', '2026-03-21 07:02:26.282');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (23, 'เงินประกันสัญญาจ้างซ่อมแซมอาคารเรียนฯ', 'NON_BUDGET', 22, 'DEPT', 'MANUAL', NULL, NULL, 0, 23, true, '2026-03-21 07:02:26.285', '2026-03-21 07:02:26.285');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (24, 'เงินประกันสัญญาโครงการปรับปรุงลานฯ', 'NON_BUDGET', 22, 'DEPT', 'MANUAL', NULL, NULL, 0, 24, true, '2026-03-21 07:02:26.286', '2026-03-21 07:02:26.286');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (25, 'เงินหักภาษี ณ ที่จ่าย', 'NON_BUDGET', NULL, 'CASH', 'BUDGET_TYPE', NULL, 8, 0, 25, true, '2026-03-21 07:02:26.288', '2026-03-21 07:02:26.288');
INSERT INTO public."BalanceReportTemplate" (id, name, section, "parentId", "column", "sourceType", "sourceBankAccountId", "sourceBudgetTypeId", "openingBalance", "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (26, 'สัญญายืมเงิน', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 26, true, '2026-03-21 07:02:26.291', '2026-03-21 07:02:26.291');


--
-- Data for Name: BankStatement; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (24, 8, '2025-12-31 00:00:00', 0, 105.25, 51780.52, 'IIPS ดอกเบี้ย', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:02:55.406', '2026-03-24 12:02:55.406');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (25, 8, '2026-01-21 00:00:00', 0, 6200, 57980.52, 'SDCK', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:02:55.406', '2026-03-24 12:02:55.406');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (26, 8, '2026-01-31 00:00:00', 0, 1000, 58980.52, 'ATSDC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:02:55.406', '2026-03-24 12:02:55.406');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (27, 8, '2026-02-13 00:00:00', 6200, 0, 52780.52, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:02:55.406', '2026-03-24 12:02:55.406');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (28, 4, '2025-10-30 00:00:00', 0, 135000, 159317.2, 'BSD14 รับเงินอุดหนุน', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (29, 4, '2025-10-31 00:00:00', 45000, 0, 114317.2, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (30, 4, '2025-11-28 00:00:00', 45000, 0, 69317.2, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (31, 4, '2025-12-26 00:00:00', 45000, 0, 24317.2, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (32, 4, '2025-12-31 00:00:00', 0, 187.04, 24504.24, 'IIPS ดอกเบี้ย', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (33, 4, '2026-01-22 00:00:00', 0, 135000, 159504.24, 'BSD14 รับเงินอุดหนุน', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (34, 4, '2026-01-30 00:00:00', 45000, 0, 114504.24, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (35, 4, '2026-02-27 00:00:00', 45000, 0, 69504.24, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (36, 7, '2025-10-03 00:00:00', 48344, 0, 321260, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (37, 7, '2025-10-10 00:00:00', 117260, 0, 204000, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (38, 7, '2025-10-10 00:00:00', 4000, 0, 200000, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (39, 7, '2025-10-30 00:00:00', 0, 1179200, 1379200, 'BSD14 รับเงินอุดหนุน', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (40, 7, '2025-11-07 00:00:00', 58410, 0, 1320790, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (41, 7, '2025-11-14 00:00:00', 58630, 0, 1262160, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (42, 7, '2025-11-21 00:00:00', 58300, 0, 1203860, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (43, 7, '2025-11-28 00:00:00', 58190, 0, 1145670, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (44, 7, '2025-11-28 00:00:00', 200000, 0, 945670, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (45, 7, '2025-12-04 00:00:00', 58190, 0, 887480, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (46, 7, '2025-12-12 00:00:00', 58300, 0, 829180, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (47, 7, '2025-12-19 00:00:00', 58300, 0, 770880, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (48, 7, '2025-12-26 00:00:00', 58300, 0, 712580, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (49, 7, '2025-12-31 00:00:00', 0, 1517.76, 714097.76, 'IIPS ดอกเบี้ย', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (50, 7, '2026-01-09 00:00:00', 58410, 0, 655687.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (51, 7, '2026-01-15 00:00:00', 46728, 0, 608959.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (52, 7, '2026-01-23 00:00:00', 58520, 0, 550439.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (53, 7, '2026-01-30 00:00:00', 58520, 0, 491919.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (54, 7, '2026-02-06 00:00:00', 58520, 0, 433399.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (55, 7, '2026-02-13 00:00:00', 58630, 0, 374769.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (56, 7, '2026-02-20 00:00:00', 58630, 0, 316139.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (57, 7, '2026-02-27 00:00:00', 58630, 0, 257509.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (58, 7, '2026-03-06 00:00:00', 46904, 0, 210605.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (59, 7, '2026-03-13 00:00:00', 58520, 0, 152085.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (60, 7, '2026-03-20 00:00:00', 58520, 0, 93565.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (61, 5, '2025-10-03 00:00:00', 10744.72, 0, 505220.19, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (62, 5, '2025-10-31 00:00:00', 0, 628525, 1133745.19, 'BSD14 รับเงินอุดหนุน', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (63, 5, '2025-11-07 00:00:00', 123153, 0, 1010592.19, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (64, 5, '2025-11-14 00:00:00', 24377.15, 0, 986215.04, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (65, 5, '2025-11-21 00:00:00', 9165, 0, 977050.04, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (66, 5, '2025-11-28 00:00:00', 2603, 0, 974447.04, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (67, 5, '2025-12-04 00:00:00', 20310.25, 0, 954136.79, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (68, 5, '2025-12-19 00:00:00', 77146.77, 0, 876990.02, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (69, 5, '2025-12-26 00:00:00', 6800, 0, 870190.02, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (70, 5, '2025-12-31 00:00:00', 0, 1686.3, 871876.32, 'IIPS ดอกเบี้ย', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (71, 5, '2026-01-05 00:00:00', 0, 249775, 1121651.32, 'BSD14', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (72, 5, '2026-01-07 00:00:00', 0, 17000, 1138651.32, 'BSD14', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (73, 5, '2026-01-09 00:00:00', 43515, 0, 1095136.32, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (74, 5, '2026-01-23 00:00:00', 28462.29, 0, 1066674.03, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (75, 5, '2026-01-30 00:00:00', 54000, 0, 1012674.03, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (76, 5, '2026-02-06 00:00:00', 5683, 0, 1006991.03, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (77, 5, '2026-02-13 00:00:00', 2182, 0, 1004809.03, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (78, 5, '2026-02-20 00:00:00', 76491, 0, 928318.03, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (79, 5, '2026-02-27 00:00:00', 71751.67, 0, 856566.36, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (80, 5, '2026-03-06 00:00:00', 7101.5, 0, 849464.86, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (81, 5, '2026-03-13 00:00:00', 11154.16, 0, 838310.7, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (82, 5, '2026-03-20 00:00:00', 18411, 0, 819899.7, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (83, 6, '2025-12-25 00:00:00', 0, 32640, 32640, 'BSD14 รับเงิน กสศ.', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:23:42.611', '2026-03-24 12:23:42.611');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (84, 6, '2025-12-31 00:00:00', 0, 11.57, 32651.57, 'IIPS ดอกเบี้ย', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:23:42.611', '2026-03-24 12:23:42.611');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (85, 6, '2026-01-30 00:00:00', 32640, 0, 11.57, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:23:42.611', '2026-03-24 12:23:42.611');
INSERT INTO public."BankStatement" (id, "bankAccountId", "transactionDate", withdrawal, deposit, balance, description, "approvalRequestId", "moneyTransactionId", "matchStatus", "createdById", "createdAt", "updatedAt") VALUES (86, 3, '2025-12-31 00:00:00', 0, 0.54, 260.4, 'IIPS ดอกเบี้ย', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:25:16.848', '2026-03-24 12:25:16.848');


--
-- Data for Name: Contractor; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."Contractor" (id, name, "taxId", address, phone, "isActive", "createdAt", "updatedAt", type) VALUES (2, 'Updated', '1234567890123', '456 Road', '0899999999', false, '2026-03-20 03:21:29.453', '2026-03-20 03:21:49.169', 'PERSON');
INSERT INTO public."Contractor" (id, name, "taxId", address, phone, "isActive", "createdAt", "updatedAt", type) VALUES (1, 'ร้านทดสอบ', '1234567890123', '123 ถนนทดสอบ', '0812345678', false, '2026-03-20 03:21:23.405', '2026-03-20 03:23:00.109', 'PERSON');
INSERT INTO public."Contractor" (id, name, "taxId", address, phone, "isActive", "createdAt", "updatedAt", type) VALUES (3, 'บริษัทเสรีภัณฑ์ จำกัด (สำนักงานใหญ่)', '0215562004745', '31/30 หมู่ 6 ตำบลเชิงเนิน อำเภอเมืองระยอง จังหวัดระยอง21000', '1111111', true, '2026-03-20 03:24:12.138', '2026-03-20 03:24:12.138', 'PERSON');
INSERT INTO public."Contractor" (id, name, "taxId", address, phone, "isActive", "createdAt", "updatedAt", type) VALUES (4, 'นางณัฐณิชา ดัชถุยาวัตร', '1219900533662', '34 / 2 หมู่ 4 ตำบลเชิงเนิน อำเภอเมืองระยอง จังหวัดระยอง 2100', '111111', true, '2026-03-20 04:17:49.738', '2026-03-20 04:17:49.738', 'PERSON');
INSERT INTO public."Contractor" (id, name, "taxId", address, phone, "isActive", "createdAt", "updatedAt", type) VALUES (5, 'นางชุลีพร ดำรงค์ชีพ', '3210100446101', '191 / 3 หมู่ 7 ตำบลเชิงเนิน อำเภอเมืองระยอง จังหวัดระยอง 2100', '11111', true, '2026-03-20 04:18:17.082', '2026-03-20 04:18:17.082', 'PERSON');
INSERT INTO public."Contractor" (id, name, "taxId", address, phone, "isActive", "createdAt", "updatedAt", type) VALUES (6, 'การประปาส่วนภูมิภาคสาขาระยอง', NULL, '222/22 หมู่ที่ 5 ต.เชิงเนิน อ.เมืองระยอง จ.ระยอง 21000', '038-611116', true, '2026-03-25 10:10:34.72', '2026-03-25 10:10:34.72', 'PERSON');
INSERT INTO public."Contractor" (id, name, "taxId", address, phone, "isActive", "createdAt", "updatedAt", type) VALUES (7, 'การไฟฟ้าส่วนภูมิภาคจังหวัดระยอง', NULL, 'เลขที่ 143 หมู่ที่ 2 ถ. สุขุมวิท ต.เนินพระ อ.เมือง จ.ระยอง 21000', '038613259', true, '2026-03-25 10:14:19.469', '2026-03-25 10:14:19.469', 'PERSON');


--
-- Data for Name: DisbursementGroup; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (3, 1, 1, 2182, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (4, 1, 6, 58630, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (5, 2, 1, 10744.72, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (6, 2, 6, 48344, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (7, 3, 6, 121260, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (8, 4, 7, 45000, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (9, 5, 1, 6683, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (10, 5, 6, 58410, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (11, 5, 11, 2800, 2);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (12, 6, 4, 341010, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (13, 7, 1, 19673.43, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (14, 7, 4, 4703.72, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (15, 7, 6, 58630, 2);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (16, 8, 1, 9165, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (17, 8, 6, 58300, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (18, 9, 1, 2603, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (19, 9, 6, 258190, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (20, 9, 7, 45000, 2);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (21, 10, 1, 20310.25, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (22, 10, 6, 58190, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (23, 11, 6, 58300, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (24, 12, 1, 38970.84, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (25, 12, 4, 38175.93, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (26, 12, 6, 58300, 2);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (27, 13, 1, 6800, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (28, 13, 6, 58300, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (29, 13, 7, 45000, 2);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (30, 14, 1, 43515, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (31, 14, 6, 58410, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (32, 15, 6, 46728, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (33, 16, 1, 27286.36, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (34, 16, 4, 1175.93, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (35, 16, 6, 58520, 2);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (36, 17, 1, 54300, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (37, 17, 5, 32640, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (38, 17, 6, 58520, 2);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (39, 18, 1, 5683, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (40, 18, 6, 58520, 1);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (41, 19, 1, 2182, 0);
INSERT INTO public."DisbursementGroup" (id, "approvalRequestId", "budgetTypeId", subtotal, "sortOrder") VALUES (42, 19, 6, 58630, 1);


--
-- Data for Name: DisbursementItem; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (3, 3, 'กิจกรรมจัดซื้ออุปกรณ์ทำความสะอาดห้องน้ำ', 2182, 21.82, 2160.18, 'บริษัทเสรีภัณฑ์ จำกัด (สำนักงานใหญ่)', NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (4, 4, 'ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 9-13 กุมภาพันธ์ 2569 จำนวน 5 วัน', 58630, 586.3, 58043.7, 'นางณัฐณิชา ดัชถุยาวัตร, นางชุลีพร ดำรงค์ชีพ', NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (5, 5, '1. ค่าน้ำเดือนกันยายน 2568', 744.72, 0, 744.72, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (6, 5, '2. กิจกรรมวันวิชาการ', 10000, 0, 10000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (7, 6, '1. ยืมเงินโครงการอาหารกลางวัน วันที่ 6,7,9,10 กันยายน 2568 จำนวน 4 วัน', 43344, 0, 43344, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (8, 6, '2. ค่าจ้างเหมาทำอาหารกลางวัน 29-30 ก.ย.2568 - 1-3ต.ค.2568 จำนวน 5 วัน', 5000, 0, 5000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (9, 7, '1. ค่าจ้างเหมาทำอาหารกลางวัน 6,7,9,10 ตุลาคม 2568 จำนวน 4 วัน', 4000, 0, 4000, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (10, 7, '2. เบิกเงินอาหารกลางวันคืนเทศบาลตำบลเชิงเนิน', 117260, 0, 117260, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (11, 8, '1.เบิกเงินโครงการจ้างครูอัตราจ้าง เดือนตุลาคม 2568  จำนวน 3 คน', 45000, 0, 45000, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (12, 9, '1. กิจกรรมBig cleaning day', 1683, 0, 1683, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (13, 9, '2. ค่าถ่ายเอกสารเดือนตุลาคม 2568', 5000, 0, 5000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (14, 10, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 3-7 พฤศจิกายน 2568 จำนวน 5 วัน', 58410, 0, 58410, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (15, 11, 'เงินค่าเครื่องแบบนักเรียน(เพิ่มเติม) จำนวน 7 คน คนละ 400 บาท', 2800, 0, 2800, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (16, 12, 'อนุบาลปีที่2 จำนวน 16 คน คนละ 145', 2320, 0, 2320, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (17, 12, 'อนุบาลปีที่3 จำนวน 26 คน คนละ 145', 3770, 0, 3770, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (18, 12, 'จำนวน 42 คน คนละ 145', 6090, 0, 6090, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (19, 12, 'ประถมศึกษาปีที่1/1 จำนวน 26 คน คนละ 220', 5720, 0, 5720, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (20, 12, 'ประถมศึกษาปีที่1/2 จำนวน 24 คน คนละ 220', 5280, 0, 5280, NULL, NULL, NULL, NULL, 4);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (21, 12, 'ประถมศึกษาปีที่1/3 จำนวน 27 คน คนละ 220', 5940, 0, 5940, NULL, NULL, NULL, NULL, 5);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (22, 12, 'ประถมศึกษาปีที่2/1 จำนวน 27 คน คนละ 220', 5940, 0, 5940, NULL, NULL, NULL, NULL, 6);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (23, 12, 'ประถมศึกษาปีที่2/2 จำนวน 26 คน คนละ 220', 5720, 0, 5720, NULL, NULL, NULL, NULL, 7);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (24, 12, 'ประถมศึกษาปีที่2/3 จำนวน 26 คน คนละ 220', 5720, 0, 5720, NULL, NULL, NULL, NULL, 8);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (25, 12, 'ประถมศึกษาปีที่3/1 จำนวน 25 คน คนละ 220', 5500, 0, 5500, NULL, NULL, NULL, NULL, 9);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (26, 12, 'ประถมศึกษาปีที่3/2 จำนวน 23 คน คนละ 220', 5060, 0, 5060, NULL, NULL, NULL, NULL, 10);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (27, 12, 'ประถมศึกษาปีที่3/3 จำนวน 26 คน คนละ 220', 5720, 0, 5720, NULL, NULL, NULL, NULL, 11);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (28, 12, 'ประถมศึกษาปีที่4/1 จำนวน 29 คน คนละ 220', 6380, 0, 6380, NULL, NULL, NULL, NULL, 12);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (29, 12, 'ประถมศึกษาปีที่4/2 จำนวน 29 คน คนละ 220', 6380, 0, 6380, NULL, NULL, NULL, NULL, 13);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (30, 12, 'ประถมศึกษาปีที่4/3 จำนวน 30 คน คนละ 220', 6600, 0, 6600, NULL, NULL, NULL, NULL, 14);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (31, 12, 'ประถมศึกษาปีที่5/1 จำนวน 27 คน คนละ 220', 5940, 0, 5940, NULL, NULL, NULL, NULL, 15);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (32, 12, 'ประถมศึกษาปีที่5/2 จำนวน 27 คน คนละ 220', 5940, 0, 5940, NULL, NULL, NULL, NULL, 16);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (33, 12, 'ประถมศึกษาปีที่5/3 จำนวน 26 คน คนละ 220', 5720, 0, 5720, NULL, NULL, NULL, NULL, 17);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (34, 12, 'ประถมศึกษาปีที่6/1 จำนวน 30 คน คนละ 220', 6600, 0, 6600, NULL, NULL, NULL, NULL, 18);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (35, 12, 'ประถมศึกษาปีที่6/2 จำนวน 32 คน คนละ 220', 7040, 0, 7040, NULL, NULL, NULL, NULL, 19);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (36, 12, 'ประถมศึกษาปีที่6/3 จำนวน 29 คน คนละ 220', 6380, 0, 6380, NULL, NULL, NULL, NULL, 20);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (37, 12, 'จำนวน 489 คน คนละ 220', 107580, 0, 107580, NULL, NULL, NULL, NULL, 21);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (38, 12, 'จำนวน 531 คน', 113670, 0, 113670, NULL, NULL, NULL, NULL, 22);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (39, 13, '1. ค่าไฟเดือนตุลาคม 2568', 19000.4, 0, 19000.4, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (40, 13, '2. ค่าน้ำเดือนตุลาคม 2568', 342.4, 0, 342.4, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (41, 13, '3. ค่าโทรศัพท์เดือนสิงหาคม 2568', 110.21, 0, 110.21, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (42, 13, '4. ค่าโทรศัพท์เดือนกันยายน 2568', 105.93, 0, 105.93, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (43, 13, '5. ค่าโทรศัพท์เดือนตุลาคม 2568', 114.49, 0, 114.49, NULL, NULL, NULL, NULL, 4);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (44, 14, '1. ค่าอินเตอร์เน็ตเดือนกรกฎาคม2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (45, 14, '2. ค่าอินเตอร์เน็ตเดือนสิงหาคม2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (46, 14, '3. ค่าอินเตอร์เน็ตเดือนกันยายน2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (47, 14, '4. ค่าอินเตอร์เน็ตเดือนตุลาคม2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (48, 15, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 10-14 พฤศจิกายน 2568 จำนวน 5 วัน', 58630, 0, 58630, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (49, 16, '1. กิจกรรมรักภาษา', 1250, 0, 1250, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (50, 16, '2. กิจกรรมแบ่งเขตแบ่งงาน', 7915, 0, 7915, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (51, 17, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 17-21 พฤศจิกายน 2568 จำนวน 5 วัน', 58300, 0, 58300, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (52, 18, '1. กิจกรรมเวชภัณฑ์อนามัยโรงเรียน', 2603, 0, 2603, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (53, 19, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 24-28 พฤศจิกายน 2568 จำนวน 5 วัน', 58190, 0, 58190, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (54, 19, '2 เบิกเงินเหลือจ่ายปีเก่าส่งสำนักงานเขตพื้นที่การศึกษาประถมศึกษาระยองเขต 1', 200000, 0, 200000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (55, 20, '1.เบิกเงินโครงการจ้างครูอัตราจ้าง เดือนพฤศจิกายน 2568  จำนวน 3 คน', 45000, 0, 45000, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (56, 21, '1. โครงการยกผลสัมฤทธิ์พิชิตความเป็นเลิศ RT,NT,O-NET', 4980, 0, 4980, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (57, 21, '2. กิจกรรมซ่อมแซมครุภัณฑ์โรงเรียน', 1200, 0, 1200, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (58, 21, '3. กิจกรรมวันพ่อแห่งชาติ', 1486, 0, 1486, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (59, 21, '4. โครงการนิเทศภายใน', 1985, 0, 1985, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (60, 21, '5. ค่าถ่ายเอกสารเดือนพฤศจิกายน 2568', 10659.25, 0, 10659.25, NULL, NULL, NULL, NULL, 4);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (61, 22, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่29 พ.ย.และวันที่ 1-4 ธ.ค. 2568 จำนวน 5 วัน', 58190, 0, 58190, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (62, 23, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่วันที่ 8-12 ธ.ค. 2568 จำนวน 5 วัน', 58300, 0, 58300, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (63, 24, '1. กิจกรรมส่งเสริมการจัดการเรียนรู้ตามหลักปรัชญาเศรษฐกิจพอเพียง', 4744, 0, 4744, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (64, 24, '2. กิจกรรมสร้างสรรค์ภาพยนต์สั้นต่อต้านการทุจริต', 3063, 0, 3063, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (65, 24, '3. กิจกรรมประชาสัมพันธ์', 2550, 0, 2550, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (66, 24, '4. ค่าน้ำเดือน พฤศจิกายน 2568', 606.69, 0, 606.69, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (67, 24, '5. ค่าโทรศัพท์เดือนพฤศจิกายน 2568', 125.19, 0, 125.19, NULL, NULL, NULL, NULL, 4);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (68, 24, '6.ค่าไฟเดือนพฤศจิกายน 2568', 27881.96, 0, 27881.96, NULL, NULL, NULL, NULL, 5);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (69, 25, '1. ค่าอินเตอร์เน็ตเดือนพฤศจิกายน 2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (70, 25, '2. โครงการEnglish Camp', 6350, 0, 6350, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (71, 25, '3. โครงการเข้าค่ายลูกเสือ ป.6', 30650, 0, 30650, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (72, 26, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 15-19 ธ.ค. 2568 จำนวน 5 วัน', 58300, 0, 58300, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (73, 27, '1. กิจกรรมชุมนุม (หนังใหญ่)', 3000, 0, 3000, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (74, 27, '2. กิจกรรมอบรมงานหัตถศิลป์ถิ่นหนังใหญ่', 3800, 0, 3800, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (75, 28, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 22-26 ธ.ค. 2568 จำนวน 5 วัน', 58300, 0, 58300, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (76, 29, '1.เบิกเงินโครงการจ้างครูอัตราจ้าง เดือนธันวาคม 2568  จำนวน 3 คน', 45000, 0, 45000, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (77, 30, '1. กิจกรรมสนับสนุนการบริหารจัดการและการจัดการเรียนรู้(โปรเจคเตอร์)', 18500, 0, 18500, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (78, 30, '2. กิจกรรมพัฒนานักเรียนที่มีภาวะถอถอยทางการเรียนรู้ด้านภาษาไทย', 3000, 0, 3000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (79, 30, '3. กิจกรรมพัฒนาการวัดและประเมินผล', 500, 0, 500, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (80, 30, '4. ค่าถ่ายเอกสารเดือนธันวาคม 2568', 5000, 0, 5000, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (81, 30, '5. กิจกรรมวันเด็กแห่งชาติ', 15000, 0, 15000, NULL, NULL, NULL, NULL, 4);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (82, 30, '6. กิจกรรมเด็กดีศรีบ้านดอน', 1515, 0, 1515, NULL, NULL, NULL, NULL, 5);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (83, 31, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 5-9 มกราคม 2568 จำนวน 5 วัน', 58410, 0, 58410, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (84, 32, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่12-15 มกราคม 2568 จำนวน 4 วัน', 46728, 0, 46728, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (85, 33, '1. ค่าไฟฟ้าเดือนธันวาคม 2568', 26630.45, 0, 26630.45, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (86, 33, '2. ค่าน้ำเดือนธันวาคม 2568', 539.28, 0, 539.28, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (87, 33, '3. ค่าโทรศัพท์เดือนธันวาคม 2568', 116.63, 0, 116.63, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (88, 34, '1. ค่าอินเตอร์เน็ตเดือนธันวาคม 2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (89, 35, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 19-23 มกราคม 2569 จำนวน 5 วัน', 58520, 0, 58520, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (90, 36, '1. กิจกรรมประชาสัมพันธ์', 3300, 0, 3300, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (91, 36, '2. กิจกรรมสนับสนุนการบริหารจัดการและการจัดการเรียนรู้', 34000, 0, 34000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (92, 36, '3. ทุนปัจจัยพื้นฐานนักเรียนยากจน จำนวน 34 ทุน ทุนละ 500 บาท', 17000, 0, 17000, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (93, 37, '1. ทุน กสศ.จำนวน 17 คน คนละ 1,920 บาท', 32640, 0, 32640, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (94, 38, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 26-30  มกราคม 2569 จำนวน 5 วัน', 58520, 0, 58520, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (95, 39, '1. ค่าถ่ายเอกสารเดือนมกราคม 2569', 5683, 0, 5683, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (96, 40, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 2-6 กุมภาพันธ์ 2569 จำนวน 5 วัน', 58520, 0, 58520, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (97, 41, '1. กิจกรรมจัดซื้ออุปกรณ์ทำความสะอาดห้องน้ำ', 2182, 0, 2182, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" (id, "disbursementGroupId", description, amount, "taxWithheld", "netAmount", "payeeName", "payeeTaxId", "payeeAddress", note, "sortOrder") VALUES (98, 42, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 9-13 กุมภาพันธ์ 2569 จำนวน 5 วัน', 58630, 0, 58630, NULL, NULL, NULL, NULL, 0);


--
-- Data for Name: MoneyTransaction; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: PaymentRecord; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."PaymentRecord" (id, "disbursementItemId", "paymentDate", "contractorId", "payeeName", amount, "taxPercent", "taxWithheld", "netAmount", "taxCertificateNo", "taxCertificateDate", "createdAt") VALUES (3, 4, '2026-03-20 00:00:00', NULL, 'นางชุลีพร ดำรงค์ชีพ', 38630, 1, 386.3, 38243.7, '3', '2026-03-19 17:00:00', '2026-03-20 10:24:44.527');
INSERT INTO public."PaymentRecord" (id, "disbursementItemId", "paymentDate", "contractorId", "payeeName", amount, "taxPercent", "taxWithheld", "netAmount", "taxCertificateNo", "taxCertificateDate", "createdAt") VALUES (1, 3, '2026-03-20 00:00:00', NULL, 'บริษัทเสรีภัณฑ์ จำกัด (สำนักงานใหญ่)', 2182, 1, 21.82, 2160.18, '1', '2026-03-19 17:00:00', '2026-03-20 10:24:44.517');
INSERT INTO public."PaymentRecord" (id, "disbursementItemId", "paymentDate", "contractorId", "payeeName", amount, "taxPercent", "taxWithheld", "netAmount", "taxCertificateNo", "taxCertificateDate", "createdAt") VALUES (2, 4, '2026-03-20 00:00:00', NULL, 'นางณัฐณิชา ดัชถุยาวัตร', 20000, 1, 200, 19800, '2', '2026-03-19 17:00:00', '2026-03-20 10:24:44.526');


--
-- Data for Name: Permission; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."Permission" (id, "group", action, description) VALUES (1, 'disbursement', 'view', 'ดูรายการเบิกจ่าย');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (2, 'disbursement', 'create', 'สร้างรายการเบิกจ่าย');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (3, 'disbursement', 'edit', 'แก้ไขรายการเบิกจ่าย');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (4, 'disbursement', 'delete', 'ลบรายการเบิกจ่าย');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (5, 'disbursement', 'workflow', 'ส่งรายการเข้ากระบวนการอนุมัติ');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (6, 'approval', 'view', 'ดูรายการรออนุมัติ');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (7, 'approval', 'approve', 'อนุมัติรายการเบิกจ่าย');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (8, 'balance', 'view', 'ดูรายงานยอมคงเหลือ');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (9, 'balance', 'manage', 'จัดการยอดคงเหลือ');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (10, 'tax', 'view', 'ดูข้อมูลภาษี');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (11, 'tax', 'manage', 'จัดการข้อมูลภาษี');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (12, 'report', 'view', 'ดูรายงาน');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (13, 'print', 'print', 'พิมพ์เอกสาร');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (14, 'admin', 'users', 'จัดการผู้ใช้งาน');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (15, 'admin', 'roles', 'จัดการบทบาท');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (16, 'admin', 'settings', 'จัดการการตั้งค่าระบบ');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (17, 'bank_account', 'manage', 'จัดการบัญชีธนาคาร');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (18, 'budget_type', 'manage', 'จัดการประเภทเงิน');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (19, 'transaction', 'view', 'ดูรายการเงินเคลื่อนไหว');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (20, 'transaction', 'create', 'บันทึกเงินเข้า');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (21, 'reconciliation', 'manage', 'กระทบยอด');
INSERT INTO public."Permission" (id, "group", action, description) VALUES (22, 'reconciliation', 'view', 'ดูผลกระทบยอด');


--
-- Data for Name: Reconciliation; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: RolePermission; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (1, 'TEACHER', 1, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (2, 'TEACHER', 12, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (3, 'FINANCE_OFFICER', 1, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (4, 'FINANCE_OFFICER', 2, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (5, 'FINANCE_OFFICER', 3, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (6, 'FINANCE_OFFICER', 4, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (7, 'FINANCE_OFFICER', 5, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (8, 'FINANCE_OFFICER', 8, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (9, 'FINANCE_OFFICER', 9, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (10, 'FINANCE_OFFICER', 10, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (11, 'FINANCE_OFFICER', 11, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (12, 'FINANCE_OFFICER', 12, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (13, 'FINANCE_OFFICER', 13, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (14, 'FINANCE_OFFICER', 17, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (15, 'FINANCE_OFFICER', 18, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (16, 'FINANCE_OFFICER', 19, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (17, 'FINANCE_OFFICER', 20, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (18, 'FINANCE_OFFICER', 21, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (19, 'FINANCE_OFFICER', 22, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (20, 'VICE_PRINCIPAL', 1, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (21, 'VICE_PRINCIPAL', 6, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (22, 'VICE_PRINCIPAL', 7, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (23, 'VICE_PRINCIPAL', 8, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (24, 'VICE_PRINCIPAL', 10, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (25, 'VICE_PRINCIPAL', 12, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (26, 'VICE_PRINCIPAL', 13, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (27, 'VICE_PRINCIPAL', 22, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (28, 'PRINCIPAL', 1, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (29, 'PRINCIPAL', 6, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (30, 'PRINCIPAL', 7, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (31, 'PRINCIPAL', 8, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (32, 'PRINCIPAL', 10, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (33, 'PRINCIPAL', 12, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (34, 'PRINCIPAL', 13, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (35, 'PRINCIPAL', 22, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (36, 'ADMIN', 1, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (37, 'ADMIN', 2, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (38, 'ADMIN', 3, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (39, 'ADMIN', 4, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (40, 'ADMIN', 5, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (41, 'ADMIN', 6, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (42, 'ADMIN', 7, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (43, 'ADMIN', 8, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (44, 'ADMIN', 9, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (45, 'ADMIN', 10, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (46, 'ADMIN', 11, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (47, 'ADMIN', 12, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (48, 'ADMIN', 13, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (49, 'ADMIN', 14, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (50, 'ADMIN', 15, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (51, 'ADMIN', 16, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (52, 'ADMIN', 17, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (53, 'ADMIN', 18, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (54, 'ADMIN', 19, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (55, 'ADMIN', 20, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (56, 'ADMIN', 21, true);
INSERT INTO public."RolePermission" (id, role, "permissionId", granted) VALUES (57, 'ADMIN', 22, true);


--
-- Data for Name: SchoolInfo; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (1, 'school_department', 'สังกัดสำนักงานเขตพื้นที่การศึกษาประถมศึกษาระยองเขต 1', '2026-03-25 10:06:55.767');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (2, 'school_name', 'โรงเรียนวัดบ้านดอน', '2026-03-25 10:06:55.774');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (3, 'school_address', '60/7 หมู่ 4 ตำบลเชิงเนิน อำเภอเมืองระยอง จังหวัดระยอง 21000', '2026-03-25 10:06:55.776');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (4, 'school_tax_id', '0994000264968', '2026-03-25 10:06:55.778');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (5, 'school_phone', '038', '2026-03-25 10:06:55.78');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (6, 'vice_principal_1_name', 'นางภควรรณ  มีเจริญ', '2026-03-25 10:06:55.782');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (7, 'vice_principal_1_position', 'รองผู้อำนวยการโรงเรียนวัดบ้านดอน', '2026-03-25 10:06:55.784');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (8, 'principal_name', 'นางสาววิภาพรรณ อุบล', '2026-03-25 10:06:55.786');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (9, 'principal_position', ' ผู้อำนวยการโรงเรียนวัดบ้านดอน', '2026-03-25 10:06:55.793');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (10, 'finance_officer_name', 'นางมณฑิรา  สายยศ', '2026-03-25 10:06:55.812');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (11, 'finance_officer_position', 'ครูชำนาญการพิเศษ', '2026-03-25 10:06:55.815');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (12, 'committee_1_name', 'นางอารีย์ พัชรนฤมล', '2026-03-25 10:06:55.817');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (13, 'committee_1_position', 'กรรมการ', '2026-03-25 10:06:55.819');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (14, 'committee_2_name', 'นางธัญสินี จันทร์บุตร', '2026-03-25 10:06:55.821');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (15, 'committee_2_position', 'กรรมการ', '2026-03-25 10:06:55.822');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (16, 'committee_3_name', 'นางสาวรัตนา บำรุงจันทร์', '2026-03-25 10:06:55.824');
INSERT INTO public."SchoolInfo" (id, key, value, "updatedAt") VALUES (17, 'committee_3_position', 'กรรมการ', '2026-03-25 10:06:55.826');


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmyc031700014z64ywd4mlx2', 2, '2026-03-27 03:20:30.806', '2026-03-20 03:20:30.81');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmyc0h7p00034z64r3i09oa3', 2, '2026-03-27 03:20:49.187', '2026-03-20 03:20:49.189');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmygtih200014zjoke53mu5u', 2, '2026-03-27 05:35:22.307', '2026-03-20 05:35:22.309');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmygw4mb00034zjo7txl7a04', 5, '2026-03-27 05:37:24.322', '2026-03-20 05:37:24.324');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmygwh3d00054zjowib42nj3', 5, '2026-03-27 05:37:40.488', '2026-03-20 05:37:40.49');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmyj6j1h00014zxke314omwf', 2, '2026-03-27 06:41:28.799', '2026-03-20 06:41:28.805');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmyqo7qh00014zhswfy34gy8', 2, '2026-03-27 10:11:11.269', '2026-03-20 10:11:11.273');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmyqq0w800034zhs88s2ph0n', 5, '2026-03-27 10:12:35.719', '2026-03-20 10:12:35.72');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmyqq59h00054zhsa67y3ge9', 5, '2026-03-27 10:12:41.38', '2026-03-20 10:12:41.381');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmyr1qd500094zhsvdl1xqto', 2, '2026-03-27 10:21:41.944', '2026-03-20 10:21:41.945');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmysje8300014z8csnn36x2x', 2, '2026-03-27 11:03:25.632', '2026-03-20 11:03:25.635');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmyslpab00034z8cqn1fe8bm', 5, '2026-03-27 11:05:13.281', '2026-03-20 11:05:13.283');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmytann800014zf09ejuwn1s', 2, '2026-03-27 11:24:37.546', '2026-03-20 11:24:37.555');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmytezot00014zycmxpogkx8', 2, '2026-03-27 11:27:59.782', '2026-03-20 11:27:59.79');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmzu0tgh00014zs0rketk7vq', 2, '2026-03-28 04:32:44.317', '2026-03-21 04:32:44.319');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmzuolcf00014z2sbjxxki07', 2, '2026-03-28 04:51:13.547', '2026-03-21 04:51:13.551');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmzvaxws00014zqwdit9p9je', 2, '2026-03-28 05:08:36.265', '2026-03-21 05:08:36.267');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmzvq57a00014z085ui5ub7i', 2, '2026-03-28 05:20:25.554', '2026-03-21 05:20:25.557');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmzw951200014z2chlrmddq2', 2, '2026-03-28 05:35:11.796', '2026-03-21 05:35:11.798');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmzwivdb00014zacn7ij98c7', 2, '2026-03-28 05:42:45.838', '2026-03-21 05:42:45.84');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmzwobmo00034zac3zej6bor', 2, '2026-03-28 05:47:00.19', '2026-03-21 05:47:00.192');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmmzwvhd700014ze0c0qvu0n2', 2, '2026-03-28 05:52:34.217', '2026-03-21 05:52:34.219');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn002u9j00014zjk2letydjz', 2, '2026-03-28 07:22:16.373', '2026-03-21 07:22:16.375');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn431jew00014z1gkkp3ti5h', 2, '2026-03-31 03:56:19.205', '2026-03-24 03:56:19.208');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn43ypfz00014zx04wjhst1b', 2, '2026-03-31 04:22:06.668', '2026-03-24 04:22:06.67');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn43yuv100034zx0ld0f6nw0', 2, '2026-03-31 04:22:13.692', '2026-03-24 04:22:13.694');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn4k29sp00014zp45715dme3', 2, '2026-03-31 11:52:46.868', '2026-03-24 11:52:46.872');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn4k2z1l00034zp4mkldqb0c', 2, '2026-03-31 11:53:19.592', '2026-03-24 11:53:19.593');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn4k379b00054zp4xltwdz2c', 2, '2026-03-31 11:53:30.238', '2026-03-24 11:53:30.24');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn5t0cd400014ztweljmqxl5', 5, '2026-04-01 08:50:59.604', '2026-03-25 08:50:59.608');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn5vno4o00014zawv2q0ryf4', 2, '2026-04-01 10:05:07.174', '2026-03-25 10:05:07.176');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn5wonti00014zi06aw26ypy', 2, '2026-04-01 10:33:53.044', '2026-03-25 10:33:53.046');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn5y019r00014z2ooe91vlhw', 2, '2026-04-01 11:10:43.303', '2026-03-25 11:10:43.311');
INSERT INTO public."Session" (id, "userId", "expiresAt", "createdAt") VALUES ('cmn5yvl2b00014zg0vp8xh2ms', 2, '2026-04-01 11:35:15.293', '2026-03-25 11:35:15.299');


--
-- Data for Name: TaxCertificate; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: TaxPaymentSummary; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: TaxSubmission; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: WorkflowAction; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (1, 1, 1, 'ยื่นเรื่องของบ', 'CREATE', 'สร้างบันทึกขออนุมัติใหม่', 2, '2026-03-20 03:29:39.108');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (2, 1, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-20 03:30:08.752');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (3, 1, 2, 'ทำหนังสือขออนุมัติ', 'APPROVE', 'อนุมัติอัตโนมัติ (โหมดอนุมัติตนเอง)', 2, '2026-03-20 03:30:08.754');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (4, 1, 3, 'เบิกเงินที่ธนาคาร', 'COMPLETE', NULL, 2, '2026-03-20 03:46:39.56');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (5, 1, 4, 'นำจ่ายผู้รับจ้าง', 'COMPLETE', NULL, 2, '2026-03-20 04:40:17.471');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (6, 1, 5, 'ออกใบ 50 ทวิ', 'COMPLETE', NULL, 2, '2026-03-20 04:40:32.089');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (7, 1, 6, '', 'REVERSE', NULL, 2, '2026-03-20 05:10:00.618');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (8, 1, 5, '', 'REVERSE', NULL, 2, '2026-03-20 05:10:29.735');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (9, 1, 4, 'Admin แก้ไข: COMPLETED(Step 4) → DRAFT(Step 1)', 'ADMIN_OVERRIDE', 'Admin test override', 5, '2026-03-20 05:37:24.373');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (10, 1, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 5, '2026-03-20 05:37:48.444');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (11, 1, 2, 'ขออนุมัติ', 'APPROVE', 'อนุมัติอัตโนมัติ (โหมดอนุมัติตนเอง)', 5, '2026-03-20 05:37:48.446');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (12, 1, 3, 'เบิกเงินที่ธนาคาร', 'COMPLETE', NULL, 5, '2026-03-20 05:38:00.418');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (13, 1, 4, 'นำจ่ายผู้รับจ้าง', 'COMPLETE', NULL, 5, '2026-03-20 05:40:37.881');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (14, 1, 4, 'Admin แก้ไข: COMPLETED(Step 4) → DRAFT(Step 1)', 'ADMIN_OVERRIDE', 'Admin test', 5, '2026-03-20 05:41:23.347');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (15, 1, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 5, '2026-03-20 05:44:48.49');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (16, 1, 2, 'ขออนุมัติ', 'APPROVE', 'อนุมัติอัตโนมัติ (โหมดอนุมัติตนเอง)', 5, '2026-03-20 05:44:48.491');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (17, 1, 3, 'เบิกเงินที่ธนาคาร', 'COMPLETE', NULL, 5, '2026-03-20 05:44:51.779');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (18, 1, 4, 'นำจ่ายผู้รับจ้าง', 'COMPLETE', NULL, 2, '2026-03-20 05:50:16.993');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (19, 1, 4, 'Admin แก้ไข: COMPLETED(Step 4) → COMPLETED(Step 4)', 'ADMIN_OVERRIDE', 'ทดสอบ', 5, '2026-03-20 06:04:25.71');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (20, 1, 4, 'Admin แก้ไข: COMPLETED(Step 4) → WITHDRAWN(Step 4)', 'ADMIN_OVERRIDE', 'ทกสอบ', 5, '2026-03-20 06:04:57.634');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (21, 1, 4, 'นำจ่ายผู้รับจ้าง', 'COMPLETE', NULL, 2, '2026-03-20 06:06:22.221');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (22, 1, 4, 'Admin แก้ไข: COMPLETED(Step 4) → WITHDRAWN(Step 4)', 'ADMIN_OVERRIDE', 'ทดสอบ', 5, '2026-03-20 10:21:21.312');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (23, 1, 4, 'นำจ่ายผู้รับจ้าง', 'COMPLETE', NULL, 2, '2026-03-20 10:24:44.53');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (24, 2, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.018');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (25, 3, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.091');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (26, 4, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.097');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (27, 5, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.102');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (28, 6, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.11');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (29, 7, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.122');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (30, 8, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.13');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (31, 9, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.136');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (32, 10, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.144');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (33, 11, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.15');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (34, 12, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.155');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (35, 13, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.164');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (36, 14, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.171');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (37, 15, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.177');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (38, 16, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.182');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (39, 17, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.19');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (40, 18, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.197');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (41, 19, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.202');
INSERT INTO public."WorkflowAction" (id, "approvalRequestId", "stepNumber", "stepName", action, comment, "performedById", "performedAt") VALUES (42, 1, 4, 'Admin แก้ไข: COMPLETED(Step 4) → WITHDRAWN(Step 4)', 'ADMIN_OVERRIDE', 'ลงข้อมูลใหม่ จากการทดสอบ', 5, '2026-03-25 10:15:41.388');


--
-- Data for Name: WorkflowSetting; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."WorkflowSetting" (id, key, value, description, "updatedAt") VALUES (1, 'approval_mode', 'self', 'โหมดการอนุมัติ: self = ครูการเงินทำเอง, approval = ต้องผ่านอนุมัติ', '2026-03-20 02:36:14.388');
INSERT INTO public."WorkflowSetting" (id, key, value, description, "updatedAt") VALUES (2, 'approval_steps', 'principal', 'ขั้นตอนอนุมัติ: vice_principal, principal, both', '2026-03-20 02:36:14.394');


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('2fc5aeb4-0d1e-4978-b8ab-fc17798148ce', '9b7dc5539e9aa2da9545c089dcefd5c368780c08499c38877a9fa5838bae96f8', '2026-03-20 02:35:59.159823+00', '20260320023558_init', NULL, NULL, '2026-03-20 02:35:58.989558+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('ee98eece-d31f-43c1-8cf2-748ac39e5f31', 'b595490cb8568f5098a1f5a0ce5e86ede9deab0bd9cc816bd6badc2d74c090ae', '2026-03-25 11:29:47.900877+00', '20260325182924_init', '', NULL, '2026-03-25 11:29:47.900877+00', 0);


--
-- Name: ApprovalRequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."ApprovalRequest_id_seq"', 19, true);


--
-- Name: BalanceEntry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."BalanceEntry_id_seq"', 1, false);


--
-- Name: BalanceReportIssued_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."BalanceReportIssued_id_seq"', 3, true);


--
-- Name: BalanceReportTemplate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."BalanceReportTemplate_id_seq"', 26, true);


--
-- Name: BalanceReport_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."BalanceReport_id_seq"', 1, false);


--
-- Name: BankAccount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."BankAccount_id_seq"', 8, true);


--
-- Name: BankStatement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."BankStatement_id_seq"', 86, true);


--
-- Name: BudgetType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."BudgetType_id_seq"', 13, true);


--
-- Name: Contractor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."Contractor_id_seq"', 7, true);


--
-- Name: DisbursementGroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."DisbursementGroup_id_seq"', 42, true);


--
-- Name: DisbursementItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."DisbursementItem_id_seq"', 98, true);


--
-- Name: MoneyTransaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."MoneyTransaction_id_seq"', 1, false);


--
-- Name: PaymentRecord_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."PaymentRecord_id_seq"', 3, true);


--
-- Name: Permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."Permission_id_seq"', 22, true);


--
-- Name: Reconciliation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."Reconciliation_id_seq"', 1, false);


--
-- Name: RolePermission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."RolePermission_id_seq"', 57, true);


--
-- Name: SchoolInfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."SchoolInfo_id_seq"', 34, true);


--
-- Name: TaxCertificate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."TaxCertificate_id_seq"', 1, false);


--
-- Name: TaxPaymentSummary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."TaxPaymentSummary_id_seq"', 1, false);


--
-- Name: TaxSubmission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."TaxSubmission_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."User_id_seq"', 5, true);


--
-- Name: WorkflowAction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."WorkflowAction_id_seq"', 42, true);


--
-- Name: WorkflowSetting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."WorkflowSetting_id_seq"', 2, true);


--
-- PostgreSQL database dump complete
--

\unrestrict rFr1u0cmP0BbdCCWdc01u8HqYbcmRwZ4J1i3wHfL58ciQzzLubQSGZtZnbtVv9c

