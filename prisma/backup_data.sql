pg_dump: warning: there are circular foreign-key constraints on this table:
pg_dump: detail: BudgetType
pg_dump: hint: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
pg_dump: hint: Consider using a full dump instead of a --data-only dump to avoid this problem.
--
-- PostgreSQL database dump
--

\restrict R1yFu1DYuaAN5aRoBatmapsUxsYfh9W6G3S2YRo1BSbSnLd54AKpfLVoU9O79Hl

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

INSERT INTO public."User" VALUES (1, 'teacher1', '$2b$10$BV4Fkp5nlvZX.SmHK3.V5OkOu./04NSYagUHakMZNfyH9INNVdy76', 'นายสมชาย ใจดี', 'ครู', 'TEACHER', NULL, true, '2026-03-19 15:04:58.654', '2026-03-19 15:04:58.654');
INSERT INTO public."User" VALUES (2, 'montira', '$2b$10$KT5APA0XuQFTH4mA61Jdt.zjU5IjdTCRFYTRWN1rl8BTxufVkotOC', 'นางมณฑิรา สายยศ', 'ครูชำนาญการพิเศษ', 'FINANCE_OFFICER', NULL, true, '2026-03-19 15:04:58.663', '2026-03-19 15:04:58.663');
INSERT INTO public."User" VALUES (3, 'suttida', '$2b$10$GCYETEQ.VmbsN9cH/njcl.ZEjfspHT6jwX4ft33oOLCw4lIEZWG3y', 'นางสาวสุทธิดา สุทธิ', 'รองผู้อำนวยการโรงเรียน', 'VICE_PRINCIPAL', NULL, true, '2026-03-19 15:04:58.667', '2026-03-19 15:04:58.667');
INSERT INTO public."User" VALUES (4, 'wipapan', '$2b$10$5rJK3YRGu1r9Cun06Mdlp.IYzafSFvjQooqjsQ6A0ICVOA/v9frxO', 'นางสาววิภาพรรณ อุบล', 'ผู้อำนวยการโรงเรียน', 'PRINCIPAL', NULL, true, '2026-03-19 15:04:58.67', '2026-03-19 15:04:58.67');
INSERT INTO public."User" VALUES (5, 'admin', '$2b$10$Y4UMR2dTYq0YAuYbu1egzu/y4LJLRHoAvB8QrmLhjxPlzvdiRi9ta', 'ผู้ดูแลระบบ', 'ผู้ดูแลระบบ', 'ADMIN', NULL, true, '2026-03-19 15:04:58.674', '2026-03-19 15:04:58.674');


--
-- Data for Name: ApprovalRequest; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."ApprovalRequest" VALUES (1, 1, 2569, '2026-02-13 00:00:00', NULL, 60812, NULL, 7, 'COMPLETED', 2, '2026-03-19 16:26:27.482', '2026-03-19 16:44:20.948');


--
-- Data for Name: BalanceReport; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: BankAccount; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."BankAccount" VALUES (3, 'ธนาคารออมสิน', '050461166014', 'เงินโครงการอาหารกลางวันโรงเรียนวัดบ้านดอน', 'ระยอง', 'SAVINGS', true, '2026-03-19 15:18:09.825', '2026-03-19 15:18:09.825');
INSERT INTO public."BankAccount" VALUES (4, 'ธนาคารกรุงไทย', '2180647115', 'เงินอุดหนุนจากเทศบาล ต.เชิงเนิน', 'ระยอง', 'SAVINGS', true, '2026-03-19 15:21:46.079', '2026-03-19 15:21:46.079');
INSERT INTO public."BankAccount" VALUES (5, 'ธนาคารกรุงไทย', '2180647107', 'เงินอุดหนุนโรงเรียนวัดบ้านดอน', 'ระยอง', 'SAVINGS', true, '2026-03-19 15:40:51.916', '2026-03-19 15:40:51.916');
INSERT INTO public."BankAccount" VALUES (6, 'ธนาคารกรุงไทย', '6777072047', 'กสศ.เพื่อโรงเรียนวัดบ้านดอน', 'เซ็นทรัลพลาซ่า ระยอง', 'SAVINGS', true, '2026-03-19 15:44:11.114', '2026-03-19 15:44:11.114');
INSERT INTO public."BankAccount" VALUES (7, 'ธนาคารกรุงไทย', '2180363133', 'เงินอุกหนุนโครงการอาหารกลางวันโรงเรียนวัดบ้านดอน', 'ระยอง', 'SAVINGS', true, '2026-03-19 15:46:20.832', '2026-03-19 15:46:20.832');
INSERT INTO public."BankAccount" VALUES (8, 'ธนาคารกรุงไทย', '2180571240', 'เงินรายได้สถานศึกษาโรงเรียนวัดบ้านดอน', 'ระยอง', 'SAVINGS', true, '2026-03-19 15:49:44.528', '2026-03-19 15:49:44.528');


--
-- Data for Name: BudgetType; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."BudgetType" VALUES (8, 'เงินหักภาษี ณ ที่จ่าย', 'WITHHOLDING_TAX', 'NON_BUDGET', NULL, NULL, true, 12);
INSERT INTO public."BudgetType" VALUES (1, 'เงินอุดหนุนทั่วไป', 'GENERAL_SUBSIDY', 'BUDGET', NULL, 5, true, 1);
INSERT INTO public."BudgetType" VALUES (2, 'เงินอุดหนุนปัจจัยพื้นฐานนักเรียนยากจน', 'SupportLine', 'BUDGET', NULL, 5, true, 2);
INSERT INTO public."BudgetType" VALUES (3, 'เงินอุดหนุนเทศบาล', 'MUNICIPALITY', 'NON_BUDGET', NULL, NULL, false, 3);
INSERT INTO public."BudgetType" VALUES (4, 'เงินเรียนฟรี 15 ปี', 'FREE_EDUCATION', 'BUDGET', NULL, 5, true, 4);
INSERT INTO public."BudgetType" VALUES (9, 'เงินเรียนฟรี15 ปี (กิจกรรมพัฒนาคุณภาพผู้เรียน)', 'FREE_EDU_Quality', 'BUDGET', 4, 5, true, 5);
INSERT INTO public."BudgetType" VALUES (10, 'เงินเรียนฟรี15 ปี (ค่าหนังสือเรียน)', 'FREE_EDU_TBOOK', 'BUDGET', 4, 5, true, 6);
INSERT INTO public."BudgetType" VALUES (11, 'เงินเรียนฟรี15 ปี (ค่าเครื่องแบบนักเรียน)', 'FREE_EDU_UNIFORM', 'BUDGET', 4, 5, true, 7);
INSERT INTO public."BudgetType" VALUES (12, 'เงินเรียนฟรี15 ปี (ค่าอุปกรณ์การเรียน)', 'FREE_EDU_EQUIP', 'BUDGET', 4, 5, true, 8);
INSERT INTO public."BudgetType" VALUES (5, 'เงินกองทุนเพื่อความเสมอภาคทางการศึกษา', 'EEF', 'BUDGET', NULL, 6, true, 9);
INSERT INTO public."BudgetType" VALUES (6, 'เงินอุดหนุนโครงการอาหารกลางวัน', 'SCHOOL_LUNCHFOOD', 'BUDGET', NULL, 7, true, 10);
INSERT INTO public."BudgetType" VALUES (13, 'เงินรายได้สถานศึกษา', 'SCHOLL_INCOME', 'NON_BUDGET', NULL, 8, true, 0);
INSERT INTO public."BudgetType" VALUES (7, 'เงินอุดหนุนเทศบาล1', 'MUNICIPAL _SUPPORT1', 'BUDGET', NULL, 4, true, 11);


--
-- Data for Name: BalanceEntry; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: BankStatement; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."BankStatement" VALUES (18, 3, '2025-12-31 00:00:00', 0, 0.54, 260.4, NULL, NULL, NULL, 'MANUAL', 2, '2026-03-19 15:58:19.219', '2026-03-19 15:58:19.219');
INSERT INTO public."BankStatement" VALUES (19, 8, '2026-03-13 00:00:00', 6200, 0, 52780.52, NULL, NULL, NULL, 'UNMATCHED', 2, '2026-03-19 15:59:17.813', '2026-03-19 15:59:17.813');
INSERT INTO public."BankStatement" VALUES (20, 4, '2026-03-13 00:00:00', 45000, 0, 69504.24, NULL, NULL, NULL, 'UNMATCHED', 2, '2026-03-19 16:00:08.922', '2026-03-19 16:00:08.922');
INSERT INTO public."BankStatement" VALUES (21, 5, '2026-03-19 00:00:00', 11154.16, 0, 838310.7, NULL, NULL, NULL, 'UNMATCHED', 2, '2026-03-19 16:00:52.358', '2026-03-19 16:00:52.358');
INSERT INTO public."BankStatement" VALUES (22, 6, '2026-01-30 00:00:00', 32640, 0, 11.57, NULL, NULL, NULL, 'UNMATCHED', 2, '2026-03-19 16:01:38.79', '2026-03-19 16:01:38.79');
INSERT INTO public."BankStatement" VALUES (23, 7, '2026-03-13 00:00:00', 58520, 0, 152085.76, NULL, NULL, NULL, 'UNMATCHED', 2, '2026-03-19 16:02:35.312', '2026-03-19 16:02:35.312');


--
-- Data for Name: DisbursementGroup; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."DisbursementGroup" VALUES (2, 1, 1, 2182, 0);
INSERT INTO public."DisbursementGroup" VALUES (3, 1, 6, 58630, 1);


--
-- Data for Name: DisbursementItem; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."DisbursementItem" VALUES (3, 2, ' กิจกรรมจัดซื้ออุปกรณ์ทำความสะอาดห้องน้ำ', 2182, 0, 2182, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (4, 3, '1. ค่าจ้างเหมาบริการทำอาหารกลางวัน วันที่ 9-13 กุมภาพันธ์ 2569 จำนวน 5 วัน', 58630, 0, 58630, NULL, NULL, NULL, NULL, 0);


--
-- Data for Name: MoneyTransaction; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: Permission; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."Permission" VALUES (1, 'disbursement', 'view', 'ดูรายการเบิกจ่าย');
INSERT INTO public."Permission" VALUES (2, 'disbursement', 'create', 'สร้างรายการเบิกจ่าย');
INSERT INTO public."Permission" VALUES (3, 'disbursement', 'edit', 'แก้ไขรายการเบิกจ่าย');
INSERT INTO public."Permission" VALUES (4, 'disbursement', 'delete', 'ลบรายการเบิกจ่าย');
INSERT INTO public."Permission" VALUES (5, 'disbursement', 'workflow', 'ส่งรายการเข้ากระบวนการอนุมัติ');
INSERT INTO public."Permission" VALUES (6, 'approval', 'view', 'ดูรายการรออนุมัติ');
INSERT INTO public."Permission" VALUES (7, 'approval', 'approve', 'อนุมัติรายการเบิกจ่าย');
INSERT INTO public."Permission" VALUES (8, 'balance', 'view', 'ดูรายงานยอมคงเหลือ');
INSERT INTO public."Permission" VALUES (9, 'balance', 'manage', 'จัดการยอดคงเหลือ');
INSERT INTO public."Permission" VALUES (10, 'tax', 'view', 'ดูข้อมูลภาษี');
INSERT INTO public."Permission" VALUES (11, 'tax', 'manage', 'จัดการข้อมูลภาษี');
INSERT INTO public."Permission" VALUES (12, 'report', 'view', 'ดูรายงาน');
INSERT INTO public."Permission" VALUES (13, 'print', 'print', 'พิมพ์เอกสาร');
INSERT INTO public."Permission" VALUES (14, 'admin', 'users', 'จัดการผู้ใช้งาน');
INSERT INTO public."Permission" VALUES (15, 'admin', 'roles', 'จัดการบทบาท');
INSERT INTO public."Permission" VALUES (16, 'admin', 'settings', 'จัดการการตั้งค่าระบบ');
INSERT INTO public."Permission" VALUES (17, 'bank_account', 'manage', 'จัดการบัญชีธนาคาร');
INSERT INTO public."Permission" VALUES (18, 'budget_type', 'manage', 'จัดการประเภทเงิน');
INSERT INTO public."Permission" VALUES (19, 'transaction', 'view', 'ดูรายการเงินเคลื่อนไหว');
INSERT INTO public."Permission" VALUES (20, 'transaction', 'create', 'บันทึกเงินเข้า');
INSERT INTO public."Permission" VALUES (21, 'reconciliation', 'manage', 'กระทบยอด');
INSERT INTO public."Permission" VALUES (22, 'reconciliation', 'view', 'ดูผลกระทบยอด');


--
-- Data for Name: Reconciliation; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: RolePermission; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."RolePermission" VALUES (1, 'TEACHER', 1, true);
INSERT INTO public."RolePermission" VALUES (2, 'TEACHER', 12, true);
INSERT INTO public."RolePermission" VALUES (3, 'FINANCE_OFFICER', 1, true);
INSERT INTO public."RolePermission" VALUES (4, 'FINANCE_OFFICER', 2, true);
INSERT INTO public."RolePermission" VALUES (5, 'FINANCE_OFFICER', 3, true);
INSERT INTO public."RolePermission" VALUES (6, 'FINANCE_OFFICER', 4, true);
INSERT INTO public."RolePermission" VALUES (7, 'FINANCE_OFFICER', 5, true);
INSERT INTO public."RolePermission" VALUES (8, 'FINANCE_OFFICER', 8, true);
INSERT INTO public."RolePermission" VALUES (9, 'FINANCE_OFFICER', 9, true);
INSERT INTO public."RolePermission" VALUES (10, 'FINANCE_OFFICER', 10, true);
INSERT INTO public."RolePermission" VALUES (11, 'FINANCE_OFFICER', 11, true);
INSERT INTO public."RolePermission" VALUES (12, 'FINANCE_OFFICER', 12, true);
INSERT INTO public."RolePermission" VALUES (13, 'FINANCE_OFFICER', 13, true);
INSERT INTO public."RolePermission" VALUES (14, 'FINANCE_OFFICER', 17, true);
INSERT INTO public."RolePermission" VALUES (15, 'FINANCE_OFFICER', 18, true);
INSERT INTO public."RolePermission" VALUES (16, 'FINANCE_OFFICER', 19, true);
INSERT INTO public."RolePermission" VALUES (17, 'FINANCE_OFFICER', 20, true);
INSERT INTO public."RolePermission" VALUES (18, 'FINANCE_OFFICER', 21, true);
INSERT INTO public."RolePermission" VALUES (19, 'FINANCE_OFFICER', 22, true);
INSERT INTO public."RolePermission" VALUES (20, 'VICE_PRINCIPAL', 1, true);
INSERT INTO public."RolePermission" VALUES (21, 'VICE_PRINCIPAL', 6, true);
INSERT INTO public."RolePermission" VALUES (22, 'VICE_PRINCIPAL', 7, true);
INSERT INTO public."RolePermission" VALUES (23, 'VICE_PRINCIPAL', 8, true);
INSERT INTO public."RolePermission" VALUES (24, 'VICE_PRINCIPAL', 10, true);
INSERT INTO public."RolePermission" VALUES (25, 'VICE_PRINCIPAL', 12, true);
INSERT INTO public."RolePermission" VALUES (26, 'VICE_PRINCIPAL', 13, true);
INSERT INTO public."RolePermission" VALUES (27, 'VICE_PRINCIPAL', 22, true);
INSERT INTO public."RolePermission" VALUES (28, 'PRINCIPAL', 1, true);
INSERT INTO public."RolePermission" VALUES (29, 'PRINCIPAL', 6, true);
INSERT INTO public."RolePermission" VALUES (30, 'PRINCIPAL', 7, true);
INSERT INTO public."RolePermission" VALUES (31, 'PRINCIPAL', 8, true);
INSERT INTO public."RolePermission" VALUES (32, 'PRINCIPAL', 10, true);
INSERT INTO public."RolePermission" VALUES (33, 'PRINCIPAL', 12, true);
INSERT INTO public."RolePermission" VALUES (34, 'PRINCIPAL', 13, true);
INSERT INTO public."RolePermission" VALUES (35, 'PRINCIPAL', 22, true);
INSERT INTO public."RolePermission" VALUES (36, 'ADMIN', 1, true);
INSERT INTO public."RolePermission" VALUES (37, 'ADMIN', 2, true);
INSERT INTO public."RolePermission" VALUES (38, 'ADMIN', 3, true);
INSERT INTO public."RolePermission" VALUES (39, 'ADMIN', 4, true);
INSERT INTO public."RolePermission" VALUES (40, 'ADMIN', 5, true);
INSERT INTO public."RolePermission" VALUES (41, 'ADMIN', 6, true);
INSERT INTO public."RolePermission" VALUES (42, 'ADMIN', 7, true);
INSERT INTO public."RolePermission" VALUES (43, 'ADMIN', 8, true);
INSERT INTO public."RolePermission" VALUES (44, 'ADMIN', 9, true);
INSERT INTO public."RolePermission" VALUES (45, 'ADMIN', 10, true);
INSERT INTO public."RolePermission" VALUES (46, 'ADMIN', 11, true);
INSERT INTO public."RolePermission" VALUES (47, 'ADMIN', 12, true);
INSERT INTO public."RolePermission" VALUES (48, 'ADMIN', 13, true);
INSERT INTO public."RolePermission" VALUES (49, 'ADMIN', 14, true);
INSERT INTO public."RolePermission" VALUES (50, 'ADMIN', 15, true);
INSERT INTO public."RolePermission" VALUES (51, 'ADMIN', 16, true);
INSERT INTO public."RolePermission" VALUES (52, 'ADMIN', 17, true);
INSERT INTO public."RolePermission" VALUES (53, 'ADMIN', 18, true);
INSERT INTO public."RolePermission" VALUES (54, 'ADMIN', 19, true);
INSERT INTO public."RolePermission" VALUES (55, 'ADMIN', 20, true);
INSERT INTO public."RolePermission" VALUES (56, 'ADMIN', 21, true);
INSERT INTO public."RolePermission" VALUES (57, 'ADMIN', 22, true);


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."Session" VALUES ('cmmxls6bh00014z8c3zhuqmra', 2, '2026-03-26 15:06:31.8', '2026-03-19 15:06:31.804');
INSERT INTO public."Session" VALUES ('cmmxlsj3h00034z8c22r0yhsg', 2, '2026-03-26 15:06:48.36', '2026-03-19 15:06:48.366');
INSERT INTO public."Session" VALUES ('cmmxlwal000054z8c7lvrfoxx', 1, '2026-03-26 15:09:43.952', '2026-03-19 15:09:43.956');


--
-- Data for Name: TaxCertificate; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: TaxPaymentSummary; Type: TABLE DATA; Schema: public; Owner: banndon
--



--
-- Data for Name: WorkflowAction; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."WorkflowAction" VALUES (1, 1, 1, 'ยื่นเรื่องของบ', 'CREATE', 'สร้างบันทึกขออนุมัติใหม่', 2, '2026-03-19 16:26:27.482');
INSERT INTO public."WorkflowAction" VALUES (2, 1, 1, 'ยื่นเรื่องของบ', 'SUBMIT', NULL, 2, '2026-03-19 16:41:08.354');
INSERT INTO public."WorkflowAction" VALUES (3, 1, 2, 'ทำหนังสือขออนุมัติ', 'APPROVE', NULL, 2, '2026-03-19 16:43:49.541');
INSERT INTO public."WorkflowAction" VALUES (4, 1, 3, 'เบิกเงินที่ธนาคาร', 'COMPLETE', NULL, 2, '2026-03-19 16:43:59.21');
INSERT INTO public."WorkflowAction" VALUES (5, 1, 4, 'นำจ่ายผู้รับจ้าง', 'COMPLETE', NULL, 2, '2026-03-19 16:44:05.494');
INSERT INTO public."WorkflowAction" VALUES (6, 1, 5, 'ออกใบ 50 ทวิ', 'COMPLETE', NULL, 2, '2026-03-19 16:44:17.851');
INSERT INTO public."WorkflowAction" VALUES (7, 1, 6, 'แจ้งยอดเงินคงเหลือ', 'COMPLETE', NULL, 2, '2026-03-19 16:44:20.947');


--
-- Data for Name: WorkflowSetting; Type: TABLE DATA; Schema: public; Owner: banndon
--

INSERT INTO public."WorkflowSetting" VALUES (1, 'approval_mode', 'self', 'โหมดการอนุมัติ: self = ครูการเงินทำเอง, approval = ต้องผ่านอนุมัติ', '2026-03-19 16:43:42.213');
INSERT INTO public."WorkflowSetting" VALUES (2, 'approval_steps', '', 'ขั้นตอนอนุมัติ: vice_principal, principal, both', '2026-03-19 16:43:42.219');


--
-- Name: ApprovalRequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."ApprovalRequest_id_seq"', 1, true);


--
-- Name: BalanceEntry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."BalanceEntry_id_seq"', 1, false);


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

SELECT pg_catalog.setval('public."BankStatement_id_seq"', 23, true);


--
-- Name: BudgetType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."BudgetType_id_seq"', 13, true);


--
-- Name: DisbursementGroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."DisbursementGroup_id_seq"', 3, true);


--
-- Name: DisbursementItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."DisbursementItem_id_seq"', 4, true);


--
-- Name: MoneyTransaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."MoneyTransaction_id_seq"', 2, true);


--
-- Name: Permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."Permission_id_seq"', 22, true);


--
-- Name: Reconciliation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."Reconciliation_id_seq"', 1, true);


--
-- Name: RolePermission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."RolePermission_id_seq"', 57, true);


--
-- Name: TaxCertificate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."TaxCertificate_id_seq"', 1, false);


--
-- Name: TaxPaymentSummary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."TaxPaymentSummary_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."User_id_seq"', 5, true);


--
-- Name: WorkflowAction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."WorkflowAction_id_seq"', 7, true);


--
-- Name: WorkflowSetting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: banndon
--

SELECT pg_catalog.setval('public."WorkflowSetting_id_seq"', 6, true);


--
-- PostgreSQL database dump complete
--

\unrestrict R1yFu1DYuaAN5aRoBatmapsUxsYfh9W6G3S2YRo1BSbSnLd54AKpfLVoU9O79Hl

