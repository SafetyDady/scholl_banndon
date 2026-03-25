docker : pg_dump: warning: there are circular foreign-key constraints on this 
table:
At line:1 char:1
+ docker exec banndon_manage-db-1 pg_dump -U banndon -d banndon_finance ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (pg_dump: warnin... on this table: 
   :String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
pg_dump: detail: BudgetType
pg_dump: hint: You might not be able to restore the dump without using 
--disable-triggers or temporarily dropping the constraints.
pg_dump: hint: Consider using a full dump instead of a --data-only dump to 
avoid this problem.
pg_dump: warning: there are circular foreign-key constraints on this table:
pg_dump: detail: BalanceReportTemplate
pg_dump: hint: You might not be able to restore the dump without using 
--disable-triggers or temporarily dropping the constraints.
pg_dump: hint: Consider using a full dump instead of a --data-only dump to 
avoid this problem.
--
-- PostgreSQL database dump
--

\restrict gOoDwomMLRiF9UuapXJh5NSkhN5S8hRgGmtWk2WauyoaV8FWG6NbsH0ycHwEiMN

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
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."User" VALUES (1, 'teacher1', '$2b$10$svMNcMWrEU0/HCzHAl8qY.Hryi9fVxNwKxu8BNJvgKQloY4rAmnNC', 'Ó©ÖÓ©▓Ó©óÓ©¬Ó©íÓ©èÓ©▓Ó©ó Ó╣âÓ©êÓ©öÓ©Á', 'Ó©äÓ©úÓ©╣', 'TEACHER', NULL, true, '2026-03-20 02:36:14.198', '2026-03-20 02:36:14.198');
INSERT INTO public."User" VALUES (3, 'suttida', '$2b$10$Unsul5ZY3Gfr36vxIIsR7OGrVbnnlQ0WXKWxuK6jL8dDEvBcbxWOW', 'Ó©ÖÓ©▓Ó©çÓ©¬Ó©▓Ó©ºÓ©¬Ó©©Ó©ùÓ©ÿÓ©┤Ó©öÓ©▓ Ó©¬Ó©©Ó©ùÓ©ÿÓ©┤', 'Ó©úÓ©¡Ó©çÓ©£Ó©╣Ó╣ëÓ©¡Ó©│Ó©ÖÓ©ºÓ©óÓ©üÓ©▓Ó©úÓ╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö', 'VICE_PRINCIPAL', NULL, true, '2026-03-20 02:36:14.221', '2026-03-20 02:36:14.221');
INSERT INTO public."User" VALUES (4, 'wipapan', '$2b$10$mIb6UxkjFFrD4VGqT56Z0uyLhLJdZzO7gZ8qP5ZxVANGs/iCzmObG', 'Ó©ÖÓ©▓Ó©çÓ©¬Ó©▓Ó©ºÓ©ºÓ©┤Ó©áÓ©▓Ó©×Ó©úÓ©úÓ©ô Ó©¡Ó©©Ó©ÜÓ©Ñ', 'Ó©£Ó©╣Ó╣ëÓ©¡Ó©│Ó©ÖÓ©ºÓ©óÓ©üÓ©▓Ó©úÓ╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö', 'PRINCIPAL', NULL, true, '2026-03-20 02:36:14.224', '2026-03-20 02:36:14.224');
INSERT INTO public."User" VALUES (2, 'montira', '$2b$10$V8Gvm/VF2JrDpwHBifJ1SuCuDdhGs5cX29ULBQB26S7S2Pn7AVdyC', 'Ó©ÖÓ©▓Ó©çÓ©íÓ©ôÓ©æÓ©┤Ó©úÓ©▓ Ó©¬Ó©▓Ó©óÓ©óÓ©¿', 'Ó©äÓ©úÓ©╣Ó©èÓ©│Ó©ÖÓ©▓Ó©ìÓ©üÓ©▓Ó©úÓ©×Ó©┤Ó╣ÇÓ©¿Ó©®', 'FINANCE_OFFICER', NULL, true, '2026-03-20 02:36:14.217', '2026-03-20 02:36:14.217');
INSERT INTO public."User" VALUES (5, 'admin', '$2b$10$JY0L4B9ssvap2yy77YS8EOfrW.ZgmICRWfDiChrUWcpYq7vopLcti', 'Ó©£Ó©╣Ó╣ëÓ©öÓ©╣Ó╣üÓ©ÑÓ©úÓ©░Ó©ÜÓ©Ü', 'Ó©£Ó©╣Ó╣ëÓ©öÓ©╣Ó╣üÓ©ÑÓ©úÓ©░Ó©ÜÓ©Ü', 'ADMIN', NULL, true, '2026-03-20 02:36:14.227', '2026-03-20 02:36:14.227');


--
-- Data for Name: ApprovalRequest; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."ApprovalRequest" VALUES (2, 1, 2569, '2025-10-03 00:00:00', NULL, 59088.72, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.018', '2026-03-24 12:34:18.018', NULL);
INSERT INTO public."ApprovalRequest" VALUES (3, 2, 2569, '2025-10-10 00:00:00', NULL, 121260, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.091', '2026-03-24 12:34:18.091', NULL);
INSERT INTO public."ApprovalRequest" VALUES (4, 3, 2569, '2025-10-31 00:00:00', NULL, 45000, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.097', '2026-03-24 12:34:18.097', NULL);
INSERT INTO public."ApprovalRequest" VALUES (5, 4, 2569, '2025-11-07 00:00:00', NULL, 67893, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.102', '2026-03-24 12:34:18.102', NULL);
INSERT INTO public."ApprovalRequest" VALUES (6, 5, 2569, '2025-11-07 00:00:00', NULL, 341010, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.11', '2026-03-24 12:34:18.11', NULL);
INSERT INTO public."ApprovalRequest" VALUES (7, 6, 2569, '2025-11-14 00:00:00', NULL, 83007.15, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.122', '2026-03-24 12:34:18.122', NULL);
INSERT INTO public."ApprovalRequest" VALUES (8, 7, 2569, '2025-11-21 00:00:00', NULL, 67465, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.13', '2026-03-24 12:34:18.13', NULL);
INSERT INTO public."ApprovalRequest" VALUES (9, 8, 2569, '2025-11-28 00:00:00', NULL, 305793, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.136', '2026-03-24 12:34:18.136', NULL);
INSERT INTO public."ApprovalRequest" VALUES (10, 9, 2569, '2025-12-04 00:00:00', NULL, 78500.25, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.144', '2026-03-24 12:34:18.144', NULL);
INSERT INTO public."ApprovalRequest" VALUES (11, 10, 2569, '2025-12-12 00:00:00', NULL, 58300, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.15', '2026-03-24 12:34:18.15', NULL);
INSERT INTO public."ApprovalRequest" VALUES (12, 11, 2569, '2025-12-19 00:00:00', NULL, 135446.77, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.155', '2026-03-24 12:34:18.155', NULL);
INSERT INTO public."ApprovalRequest" VALUES (13, 12, 2569, '2025-12-26 00:00:00', NULL, 110100, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.164', '2026-03-24 12:34:18.164', NULL);
INSERT INTO public."ApprovalRequest" VALUES (14, 13, 2569, '2026-01-09 00:00:00', NULL, 101925, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.171', '2026-03-24 12:34:18.171', NULL);
INSERT INTO public."ApprovalRequest" VALUES (15, 14, 2569, '2026-01-15 00:00:00', NULL, 46728, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.177', '2026-03-24 12:34:18.177', NULL);
INSERT INTO public."ApprovalRequest" VALUES (16, 15, 2569, '2026-01-23 00:00:00', NULL, 86982.29, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.182', '2026-03-24 12:34:18.182', NULL);
INSERT INTO public."ApprovalRequest" VALUES (17, 16, 2569, '2026-01-30 00:00:00', NULL, 145460, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.19', '2026-03-24 12:34:18.19', NULL);
INSERT INTO public."ApprovalRequest" VALUES (18, 17, 2569, '2026-02-06 00:00:00', NULL, 64203, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.197', '2026-03-24 12:34:18.197', NULL);
INSERT INTO public."ApprovalRequest" VALUES (19, 18, 2569, '2026-02-13 00:00:00', NULL, 60812, NULL, 1, 'DRAFT', 2, '2026-03-24 12:34:18.202', '2026-03-24 12:34:18.202', NULL);
INSERT INTO public."ApprovalRequest" VALUES (1, 1, 2569, '2026-02-13 00:00:00', NULL, 60812, NULL, 4, 'WITHDRAWN', 2, '2026-03-20 03:29:39.108', '2026-03-25 10:15:41.391', NULL);


--
-- Data for Name: BalanceReport; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: BankAccount; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."BankAccount" VALUES (3, 'Ó©ÿÓ©ÖÓ©▓Ó©äÓ©▓Ó©úÓ©¡Ó©¡Ó©íÓ©¬Ó©┤Ó©Ö', '050461166014', 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©ÖÓ╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ºÓ©▒Ó©öÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', 'Ó©úÓ©░Ó©óÓ©¡Ó©ç', 'SAVINGS', true, '2026-03-19 15:18:09.825', '2026-03-19 15:18:09.825');
INSERT INTO public."BankAccount" VALUES (4, 'Ó©ÿÓ©ÖÓ©▓Ó©äÓ©▓Ó©úÓ©üÓ©úÓ©©Ó©çÓ╣äÓ©ùÓ©ó', '2180647115', 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©ÖÓ©êÓ©▓Ó©üÓ╣ÇÓ©ùÓ©¿Ó©ÜÓ©▓Ó©Ñ Ó©ò.Ó╣ÇÓ©èÓ©┤Ó©çÓ╣ÇÓ©ÖÓ©┤Ó©Ö', 'Ó©úÓ©░Ó©óÓ©¡Ó©ç', 'SAVINGS', true, '2026-03-19 15:21:46.079', '2026-03-19 15:21:46.079');
INSERT INTO public."BankAccount" VALUES (5, 'Ó©ÿÓ©ÖÓ©▓Ó©äÓ©▓Ó©úÓ©üÓ©úÓ©©Ó©çÓ╣äÓ©ùÓ©ó', '2180647107', 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©ÖÓ╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ºÓ©▒Ó©öÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', 'Ó©úÓ©░Ó©óÓ©¡Ó©ç', 'SAVINGS', true, '2026-03-19 15:40:51.916', '2026-03-19 15:40:51.916');
INSERT INTO public."BankAccount" VALUES (6, 'Ó©ÿÓ©ÖÓ©▓Ó©äÓ©▓Ó©úÓ©üÓ©úÓ©©Ó©çÓ╣äÓ©ùÓ©ó', '6777072047', 'Ó©üÓ©¬Ó©¿.Ó╣ÇÓ©×Ó©ÀÓ╣êÓ©¡Ó╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ºÓ©▒Ó©öÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', 'Ó╣ÇÓ©ïÓ╣çÓ©ÖÓ©ùÓ©úÓ©▒Ó©ÑÓ©×Ó©ÑÓ©▓Ó©ïÓ╣êÓ©▓ Ó©úÓ©░Ó©óÓ©¡Ó©ç', 'SAVINGS', true, '2026-03-19 15:44:11.114', '2026-03-19 15:44:11.114');
INSERT INTO public."BankAccount" VALUES (7, 'Ó©ÿÓ©ÖÓ©▓Ó©äÓ©▓Ó©úÓ©üÓ©úÓ©©Ó©çÓ╣äÓ©ùÓ©ó', '2180363133', 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©üÓ©½Ó©ÖÓ©©Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©ÖÓ╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ºÓ©▒Ó©öÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', 'Ó©úÓ©░Ó©óÓ©¡Ó©ç', 'SAVINGS', true, '2026-03-19 15:46:20.832', '2026-03-19 15:46:20.832');
INSERT INTO public."BankAccount" VALUES (8, 'Ó©ÿÓ©ÖÓ©▓Ó©äÓ©▓Ó©úÓ©üÓ©úÓ©©Ó©çÓ╣äÓ©ùÓ©ó', '2180571240', 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©úÓ©▓Ó©óÓ╣äÓ©öÓ╣ëÓ©¬Ó©ûÓ©▓Ó©ÖÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ºÓ©▒Ó©öÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', 'Ó©úÓ©░Ó©óÓ©¡Ó©ç', 'SAVINGS', true, '2026-03-19 15:49:44.528', '2026-03-19 15:49:44.528');


--
-- Data for Name: BudgetType; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."BudgetType" VALUES (8, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©½Ó©▒Ó©üÓ©áÓ©▓Ó©®Ó©Á Ó©ô Ó©ùÓ©ÁÓ╣êÓ©êÓ╣êÓ©▓Ó©ó', 'WITHHOLDING_TAX', 'NON_BUDGET', NULL, NULL, true, 12);
INSERT INTO public."BudgetType" VALUES (1, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©ÖÓ©ùÓ©▒Ó╣êÓ©ºÓ╣äÓ©ø', 'GENERAL_SUBSIDY', 'BUDGET', NULL, 5, true, 1);
INSERT INTO public."BudgetType" VALUES (2, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©ÖÓ©øÓ©▒Ó©êÓ©êÓ©▒Ó©óÓ©×Ó©ÀÓ╣ëÓ©ÖÓ©ÉÓ©▓Ó©ÖÓ©ÖÓ©▒Ó©üÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©óÓ©▓Ó©üÓ©êÓ©Ö', 'SupportLine', 'BUDGET', NULL, 5, true, 2);
INSERT INTO public."BudgetType" VALUES (3, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©ÖÓ╣ÇÓ©ùÓ©¿Ó©ÜÓ©▓Ó©Ñ', 'MUNICIPALITY', 'NON_BUDGET', NULL, NULL, false, 3);
INSERT INTO public."BudgetType" VALUES (4, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ƒÓ©úÓ©Á 15 Ó©øÓ©Á', 'FREE_EDUCATION', 'BUDGET', NULL, 5, true, 4);
INSERT INTO public."BudgetType" VALUES (9, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ƒÓ©úÓ©Á15 Ó©øÓ©Á (Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©×Ó©▒Ó©ÆÓ©ÖÓ©▓Ó©äÓ©©Ó©ôÓ©áÓ©▓Ó©×Ó©£Ó©╣Ó╣ëÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö)', 'FREE_EDU_Quality', 'BUDGET', 4, 5, true, 5);
INSERT INTO public."BudgetType" VALUES (10, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ƒÓ©úÓ©Á15 Ó©øÓ©Á (Ó©äÓ╣êÓ©▓Ó©½Ó©ÖÓ©▒Ó©çÓ©¬Ó©ÀÓ©¡Ó╣ÇÓ©úÓ©ÁÓ©óÓ©Ö)', 'FREE_EDU_TBOOK', 'BUDGET', 4, 5, true, 6);
INSERT INTO public."BudgetType" VALUES (11, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ƒÓ©úÓ©Á15 Ó©øÓ©Á (Ó©äÓ╣êÓ©▓Ó╣ÇÓ©äÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ╣üÓ©ÜÓ©ÜÓ©ÖÓ©▒Ó©üÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö)', 'FREE_EDU_UNIFORM', 'BUDGET', 4, 5, true, 7);
INSERT INTO public."BudgetType" VALUES (12, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ƒÓ©úÓ©Á15 Ó©øÓ©Á (Ó©äÓ╣êÓ©▓Ó©¡Ó©©Ó©øÓ©üÓ©úÓ©ôÓ╣îÓ©üÓ©▓Ó©úÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö)', 'FREE_EDU_EQUIP', 'BUDGET', 4, 5, true, 8);
INSERT INTO public."BudgetType" VALUES (5, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©üÓ©¡Ó©çÓ©ùÓ©©Ó©ÖÓ╣ÇÓ©×Ó©ÀÓ╣êÓ©¡Ó©äÓ©ºÓ©▓Ó©íÓ╣ÇÓ©¬Ó©íÓ©¡Ó©áÓ©▓Ó©äÓ©ùÓ©▓Ó©çÓ©üÓ©▓Ó©úÓ©¿Ó©ÂÓ©üÓ©®Ó©▓', 'EEF', 'BUDGET', NULL, 6, true, 9);
INSERT INTO public."BudgetType" VALUES (6, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö', 'SCHOOL_LUNCHFOOD', 'BUDGET', NULL, 7, true, 10);
INSERT INTO public."BudgetType" VALUES (13, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©úÓ©▓Ó©óÓ╣äÓ©öÓ╣ëÓ©¬Ó©ûÓ©▓Ó©ÖÓ©¿Ó©ÂÓ©üÓ©®Ó©▓', 'SCHOLL_INCOME', 'NON_BUDGET', NULL, 8, true, 0);
INSERT INTO public."BudgetType" VALUES (7, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©ÖÓ╣ÇÓ©ùÓ©¿Ó©ÜÓ©▓Ó©Ñ1', 'MUNICIPAL _SUPPORT1', 'BUDGET', NULL, 4, true, 11);


--
-- Data for Name: BalanceEntry; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: BalanceReportIssued; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."BalanceReportIssued" VALUES (1, '2026-03-19 00:00:00', 2569, '2026-03-21 07:22:37.113', 2, NULL);
INSERT INTO public."BalanceReportIssued" VALUES (2, '2025-12-31 00:00:00', 2569, '2026-03-21 07:27:02.976', 2, NULL);
INSERT INTO public."BalanceReportIssued" VALUES (3, '2025-10-03 00:00:00', 2569, '2026-03-25 08:57:59.576', 5, NULL);


--
-- Data for Name: BalanceReportTemplate; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."BalanceReportTemplate" VALUES (1, 'Ó©öÓ©¡Ó©üÓ╣ÇÓ©ÜÓ©ÁÓ╣ëÓ©óÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©ØÓ©▓Ó©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©ÖÓ©ùÓ©▒Ó╣êÓ©ºÓ╣äÓ©ø', 'BUDGET_REVENUE', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 1, true, '2026-03-21 07:02:26.226', '2026-03-21 07:02:26.226');
INSERT INTO public."BalanceReportTemplate" VALUES (2, 'Ó©öÓ©¡Ó©üÓ╣ÇÓ©ÜÓ©ÁÓ╣ëÓ©óÓ©ÜÓ©▒Ó©ìÓ©èÓ©ÁÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©ØÓ©▓Ó©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö', 'BUDGET_REVENUE', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 2, true, '2026-03-21 07:02:26.236', '2026-03-21 07:02:26.236');
INSERT INTO public."BalanceReportTemplate" VALUES (3, 'Ó©öÓ©¡Ó©üÓ╣ÇÓ©ÜÓ©ÁÓ╣ëÓ©óÓ╣ÇÓ©çÓ©┤Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©êÓ╣ëÓ©▓Ó©çÓ©äÓ©úÓ©╣Ó©»', 'BUDGET_REVENUE', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 3, true, '2026-03-21 07:02:26.238', '2026-03-21 07:02:26.238');
INSERT INTO public."BalanceReportTemplate" VALUES (4, 'Ó©öÓ©¡Ó©üÓ╣ÇÓ©ÜÓ©ÁÓ╣ëÓ©óÓ╣ÇÓ©çÓ©┤Ó©Ö Ó©üÓ©¬Ó©¿.Ó╣ÇÓ©×Ó©ÀÓ╣êÓ©¡Ó╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ºÓ©▒Ó©öÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', 'BUDGET_REVENUE', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 4, true, '2026-03-21 07:02:26.24', '2026-03-21 07:02:26.24');
INSERT INTO public."BalanceReportTemplate" VALUES (5, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©ÖÓ©äÓ╣êÓ©▓Ó╣âÓ©èÓ╣ëÓ©êÓ╣êÓ©▓Ó©óÓ╣âÓ©ÖÓ©üÓ©▓Ó©úÓ©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©éÓ©▒Ó╣ëÓ©ÖÓ©×Ó©ÀÓ╣ëÓ©ÖÓ©ÉÓ©▓Ó©Ö', 'NON_BUDGET', NULL, 'BANK', 'BUDGET_TYPE', NULL, 1, 0, 5, true, '2026-03-21 07:02:26.242', '2026-03-21 07:02:26.242');
INSERT INTO public."BalanceReportTemplate" VALUES (6, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©ÖÓ©øÓ©▒Ó©êÓ©êÓ©▒Ó©óÓ©×Ó©ÀÓ╣ëÓ©ÖÓ©ÉÓ©▓Ó©ÖÓ©¬Ó©│Ó©½Ó©úÓ©▒Ó©ÜÓ©ÖÓ©▒Ó©üÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©óÓ©▓Ó©üÓ©êÓ©ÖÓ©»', 'NON_BUDGET', NULL, 'BANK', 'BUDGET_TYPE', NULL, 2, 0, 6, true, '2026-03-21 07:02:26.246', '2026-03-21 07:02:26.246');
INSERT INTO public."BalanceReportTemplate" VALUES (7, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ƒÓ©úÓ©Á 15 Ó©øÓ©Á', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 7, true, '2026-03-21 07:02:26.248', '2026-03-21 07:02:26.248');
INSERT INTO public."BalanceReportTemplate" VALUES (8, 'Ó©äÓ╣êÓ©▓Ó©¡Ó©©Ó©øÓ©üÓ©úÓ©ôÓ╣îÓ©üÓ©▓Ó©úÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö', 'NON_BUDGET', 7, 'BANK', 'BUDGET_TYPE', NULL, 12, 0, 8, true, '2026-03-21 07:02:26.251', '2026-03-21 07:02:26.251');
INSERT INTO public."BalanceReportTemplate" VALUES (9, 'Ó©äÓ╣êÓ©▓Ó╣ÇÓ©äÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ╣üÓ©ÜÓ©ÜÓ©ÖÓ©▒Ó©üÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö', 'NON_BUDGET', 7, 'BANK', 'BUDGET_TYPE', NULL, 11, 0, 9, true, '2026-03-21 07:02:26.253', '2026-03-21 07:02:26.253');
INSERT INTO public."BalanceReportTemplate" VALUES (10, 'Ó©äÓ╣êÓ©▓Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©×Ó©▒Ó©ÆÓ©ÖÓ©▓Ó©äÓ©©Ó©ôÓ©áÓ©▓Ó©×Ó©£Ó©╣Ó╣ëÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö', 'NON_BUDGET', 7, 'BANK', 'BUDGET_TYPE', NULL, 9, 0, 10, true, '2026-03-21 07:02:26.256', '2026-03-21 07:02:26.256');
INSERT INTO public."BalanceReportTemplate" VALUES (11, 'Ó©äÓ╣êÓ©▓Ó©½Ó©ÖÓ©▒Ó©çÓ©¬Ó©ÀÓ©¡Ó╣ÇÓ©úÓ©ÁÓ©óÓ©Ö', 'NON_BUDGET', 7, 'BANK', 'BUDGET_TYPE', NULL, 10, 0, 11, true, '2026-03-21 07:02:26.258', '2026-03-21 07:02:26.258');
INSERT INTO public."BalanceReportTemplate" VALUES (12, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©ÿÓ©©Ó©úÓ©üÓ©▓Ó©úÓ╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 12, true, '2026-03-21 07:02:26.26', '2026-03-21 07:02:26.26');
INSERT INTO public."BalanceReportTemplate" VALUES (13, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©¬Ó©ÖÓ©▒Ó©ÜÓ©¬Ó©ÖÓ©©Ó©ÖÓ©äÓ╣êÓ©▓Ó╣âÓ©èÓ╣ëÓ©êÓ╣êÓ©▓Ó©óÓ©öÓ╣ëÓ©▓Ó©ÖÓ©üÓ©▓Ó©úÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó╣ÇÓ©×Ó©ÀÓ╣êÓ©¡Ó©ÑÓ©öÓ©áÓ©▓Ó©úÓ©░Ó©»', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 13, true, '2026-03-21 07:02:26.261', '2026-03-21 07:02:26.261');
INSERT INTO public."BalanceReportTemplate" VALUES (14, 'Ó╣ÇÓ©çÓ©┤Ó©Ö Ó©üÓ©¬Ó©¿.Ó╣ÇÓ©×Ó©ÀÓ╣êÓ©¡Ó╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ºÓ©▒Ó©öÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', 'NON_BUDGET', NULL, 'BANK', 'BUDGET_TYPE', NULL, 5, 0, 14, true, '2026-03-21 07:02:26.263', '2026-03-21 07:02:26.263');
INSERT INTO public."BalanceReportTemplate" VALUES (15, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©çÓ©ÜÓ©øÓ©úÓ©░Ó©íÓ©▓Ó©ôÓ©ùÓ©ÁÓ╣êÓ╣äÓ©öÓ╣ëÓ©úÓ©▒Ó©ÜÓ©üÓ©▓Ó©úÓ©¬Ó©ÖÓ©▒Ó©ÜÓ©¬Ó©ÖÓ©©Ó©ÖÓ©êÓ©▓Ó©üÓ╣ÇÓ©ùÓ©¿Ó©ÜÓ©▓Ó©ÑÓ©»', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 15, true, '2026-03-21 07:02:26.265', '2026-03-21 07:02:26.265');
INSERT INTO public."BalanceReportTemplate" VALUES (16, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö', 'NON_BUDGET', 15, 'BANK', 'BUDGET_TYPE', NULL, 6, 0, 16, true, '2026-03-21 07:02:26.269', '2026-03-21 07:02:26.269');
INSERT INTO public."BalanceReportTemplate" VALUES (17, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©êÓ╣ëÓ©▓Ó©çÓ©äÓ©úÓ©╣Ó©»', 'NON_BUDGET', 15, 'BANK', 'MANUAL', NULL, NULL, 0, 17, true, '2026-03-21 07:02:26.271', '2026-03-21 07:02:26.271');
INSERT INTO public."BalanceReportTemplate" VALUES (18, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö(Ó©ÿ.Ó©¡Ó©¡Ó©íÓ©¬Ó©┤Ó©Ö)', 'NON_BUDGET', NULL, 'BANK', 'BANK_ACCOUNT', 3, NULL, 0, 18, true, '2026-03-21 07:02:26.273', '2026-03-21 07:02:26.273');
INSERT INTO public."BalanceReportTemplate" VALUES (19, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©úÓ©▓Ó©óÓ╣äÓ©öÓ╣ëÓ©¬Ó©ûÓ©▓Ó©ÖÓ©¿Ó©ÂÓ©üÓ©®Ó©▓', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 19, true, '2026-03-21 07:02:26.276', '2026-03-21 07:02:26.276');
INSERT INTO public."BalanceReportTemplate" VALUES (20, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©úÓ©▓Ó©óÓ╣äÓ©öÓ╣ëÓ©¬Ó©ûÓ©▓Ó©ÖÓ©¿Ó©ÂÓ©üÓ©®Ó©▓(Ó©úÓ©░Ó©ÜÓ©©Ó©ºÓ©▒Ó©òÓ©ûÓ©©Ó©øÓ©úÓ©░Ó©¬Ó©çÓ©äÓ╣î)', 'NON_BUDGET', 19, 'BANK', 'MANUAL', NULL, NULL, 0, 20, true, '2026-03-21 07:02:26.279', '2026-03-21 07:02:26.279');
INSERT INTO public."BalanceReportTemplate" VALUES (21, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©úÓ©▓Ó©óÓ╣äÓ©öÓ╣ëÓ©¬Ó©ûÓ©▓Ó©ÖÓ©¿Ó©ÂÓ©üÓ©®Ó©▓(Ó╣äÓ©íÓ╣êÓ©úÓ©░Ó©ÜÓ©©Ó©ºÓ©▒Ó©òÓ©ûÓ©©Ó©øÓ©úÓ©░Ó©¬Ó©çÓ©äÓ╣î)', 'NON_BUDGET', 19, 'BANK', 'MANUAL', NULL, NULL, 0, 21, true, '2026-03-21 07:02:26.281', '2026-03-21 07:02:26.281');
INSERT INTO public."BalanceReportTemplate" VALUES (22, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©øÓ©úÓ©░Ó©üÓ©▒Ó©ÖÓ©¬Ó©▒Ó©ìÓ©ìÓ©▓', 'NON_BUDGET', NULL, 'DEPT', 'MANUAL', NULL, NULL, 0, 22, true, '2026-03-21 07:02:26.282', '2026-03-21 07:02:26.282');
INSERT INTO public."BalanceReportTemplate" VALUES (23, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©øÓ©úÓ©░Ó©üÓ©▒Ó©ÖÓ©¬Ó©▒Ó©ìÓ©ìÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ©ïÓ╣êÓ©¡Ó©íÓ╣üÓ©ïÓ©íÓ©¡Ó©▓Ó©äÓ©▓Ó©úÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©»', 'NON_BUDGET', 22, 'DEPT', 'MANUAL', NULL, NULL, 0, 23, true, '2026-03-21 07:02:26.285', '2026-03-21 07:02:26.285');
INSERT INTO public."BalanceReportTemplate" VALUES (24, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©øÓ©úÓ©░Ó©üÓ©▒Ó©ÖÓ©¬Ó©▒Ó©ìÓ©ìÓ©▓Ó╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©øÓ©úÓ©▒Ó©ÜÓ©øÓ©úÓ©©Ó©çÓ©ÑÓ©▓Ó©ÖÓ©»', 'NON_BUDGET', 22, 'DEPT', 'MANUAL', NULL, NULL, 0, 24, true, '2026-03-21 07:02:26.286', '2026-03-21 07:02:26.286');
INSERT INTO public."BalanceReportTemplate" VALUES (25, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©½Ó©▒Ó©üÓ©áÓ©▓Ó©®Ó©Á Ó©ô Ó©ùÓ©ÁÓ╣êÓ©êÓ╣êÓ©▓Ó©ó', 'NON_BUDGET', NULL, 'CASH', 'BUDGET_TYPE', NULL, 8, 0, 25, true, '2026-03-21 07:02:26.288', '2026-03-21 07:02:26.288');
INSERT INTO public."BalanceReportTemplate" VALUES (26, 'Ó©¬Ó©▒Ó©ìÓ©ìÓ©▓Ó©óÓ©ÀÓ©íÓ╣ÇÓ©çÓ©┤Ó©Ö', 'NON_BUDGET', NULL, 'BANK', 'MANUAL', NULL, NULL, 0, 26, true, '2026-03-21 07:02:26.291', '2026-03-21 07:02:26.291');


--
-- Data for Name: BankStatement; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."BankStatement" VALUES (24, 8, '2025-12-31 00:00:00', 0, 105.25, 51780.52, 'IIPS Ó©öÓ©¡Ó©üÓ╣ÇÓ©ÜÓ©ÁÓ╣ëÓ©ó', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:02:55.406', '2026-03-24 12:02:55.406');
INSERT INTO public."BankStatement" VALUES (25, 8, '2026-01-21 00:00:00', 0, 6200, 57980.52, 'SDCK', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:02:55.406', '2026-03-24 12:02:55.406');
INSERT INTO public."BankStatement" VALUES (26, 8, '2026-01-31 00:00:00', 0, 1000, 58980.52, 'ATSDC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:02:55.406', '2026-03-24 12:02:55.406');
INSERT INTO public."BankStatement" VALUES (27, 8, '2026-02-13 00:00:00', 6200, 0, 52780.52, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:02:55.406', '2026-03-24 12:02:55.406');
INSERT INTO public."BankStatement" VALUES (28, 4, '2025-10-30 00:00:00', 0, 135000, 159317.2, 'BSD14 Ó©úÓ©▒Ó©ÜÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©Ö', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" VALUES (29, 4, '2025-10-31 00:00:00', 45000, 0, 114317.2, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" VALUES (30, 4, '2025-11-28 00:00:00', 45000, 0, 69317.2, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" VALUES (31, 4, '2025-12-26 00:00:00', 45000, 0, 24317.2, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" VALUES (32, 4, '2025-12-31 00:00:00', 0, 187.04, 24504.24, 'IIPS Ó©öÓ©¡Ó©üÓ╣ÇÓ©ÜÓ©ÁÓ╣ëÓ©ó', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" VALUES (33, 4, '2026-01-22 00:00:00', 0, 135000, 159504.24, 'BSD14 Ó©úÓ©▒Ó©ÜÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©Ö', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" VALUES (34, 4, '2026-01-30 00:00:00', 45000, 0, 114504.24, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" VALUES (35, 4, '2026-02-27 00:00:00', 45000, 0, 69504.24, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:05:31.619', '2026-03-24 12:05:31.619');
INSERT INTO public."BankStatement" VALUES (36, 7, '2025-10-03 00:00:00', 48344, 0, 321260, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (37, 7, '2025-10-10 00:00:00', 117260, 0, 204000, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (38, 7, '2025-10-10 00:00:00', 4000, 0, 200000, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (39, 7, '2025-10-30 00:00:00', 0, 1179200, 1379200, 'BSD14 Ó©úÓ©▒Ó©ÜÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©Ö', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (40, 7, '2025-11-07 00:00:00', 58410, 0, 1320790, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (41, 7, '2025-11-14 00:00:00', 58630, 0, 1262160, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (42, 7, '2025-11-21 00:00:00', 58300, 0, 1203860, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (43, 7, '2025-11-28 00:00:00', 58190, 0, 1145670, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (44, 7, '2025-11-28 00:00:00', 200000, 0, 945670, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (45, 7, '2025-12-04 00:00:00', 58190, 0, 887480, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (46, 7, '2025-12-12 00:00:00', 58300, 0, 829180, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (47, 7, '2025-12-19 00:00:00', 58300, 0, 770880, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (48, 7, '2025-12-26 00:00:00', 58300, 0, 712580, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (49, 7, '2025-12-31 00:00:00', 0, 1517.76, 714097.76, 'IIPS Ó©öÓ©¡Ó©üÓ╣ÇÓ©ÜÓ©ÁÓ╣ëÓ©ó', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (50, 7, '2026-01-09 00:00:00', 58410, 0, 655687.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (51, 7, '2026-01-15 00:00:00', 46728, 0, 608959.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (52, 7, '2026-01-23 00:00:00', 58520, 0, 550439.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (53, 7, '2026-01-30 00:00:00', 58520, 0, 491919.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (54, 7, '2026-02-06 00:00:00', 58520, 0, 433399.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (55, 7, '2026-02-13 00:00:00', 58630, 0, 374769.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (56, 7, '2026-02-20 00:00:00', 58630, 0, 316139.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (57, 7, '2026-02-27 00:00:00', 58630, 0, 257509.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (58, 7, '2026-03-06 00:00:00', 46904, 0, 210605.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (59, 7, '2026-03-13 00:00:00', 58520, 0, 152085.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (60, 7, '2026-03-20 00:00:00', 58520, 0, 93565.76, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:10:09.107', '2026-03-24 12:10:09.107');
INSERT INTO public."BankStatement" VALUES (61, 5, '2025-10-03 00:00:00', 10744.72, 0, 505220.19, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (62, 5, '2025-10-31 00:00:00', 0, 628525, 1133745.19, 'BSD14 Ó©úÓ©▒Ó©ÜÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©©Ó©öÓ©½Ó©ÖÓ©©Ó©Ö', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (63, 5, '2025-11-07 00:00:00', 123153, 0, 1010592.19, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (64, 5, '2025-11-14 00:00:00', 24377.15, 0, 986215.04, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (65, 5, '2025-11-21 00:00:00', 9165, 0, 977050.04, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (66, 5, '2025-11-28 00:00:00', 2603, 0, 974447.04, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (67, 5, '2025-12-04 00:00:00', 20310.25, 0, 954136.79, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (68, 5, '2025-12-19 00:00:00', 77146.77, 0, 876990.02, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (69, 5, '2025-12-26 00:00:00', 6800, 0, 870190.02, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (70, 5, '2025-12-31 00:00:00', 0, 1686.3, 871876.32, 'IIPS Ó©öÓ©¡Ó©üÓ╣ÇÓ©ÜÓ©ÁÓ╣ëÓ©ó', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (71, 5, '2026-01-05 00:00:00', 0, 249775, 1121651.32, 'BSD14', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (72, 5, '2026-01-07 00:00:00', 0, 17000, 1138651.32, 'BSD14', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (73, 5, '2026-01-09 00:00:00', 43515, 0, 1095136.32, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (74, 5, '2026-01-23 00:00:00', 28462.29, 0, 1066674.03, 'SWTRC', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (75, 5, '2026-01-30 00:00:00', 54000, 0, 1012674.03, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (76, 5, '2026-02-06 00:00:00', 5683, 0, 1006991.03, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (77, 5, '2026-02-13 00:00:00', 2182, 0, 1004809.03, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (78, 5, '2026-02-20 00:00:00', 76491, 0, 928318.03, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (79, 5, '2026-02-27 00:00:00', 71751.67, 0, 856566.36, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (80, 5, '2026-03-06 00:00:00', 7101.5, 0, 849464.86, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (81, 5, '2026-03-13 00:00:00', 11154.16, 0, 838310.7, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (82, 5, '2026-03-20 00:00:00', 18411, 0, 819899.7, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:22:05.78', '2026-03-24 12:22:05.78');
INSERT INTO public."BankStatement" VALUES (83, 6, '2025-12-25 00:00:00', 0, 32640, 32640, 'BSD14 Ó©úÓ©▒Ó©ÜÓ╣ÇÓ©çÓ©┤Ó©Ö Ó©üÓ©¬Ó©¿.', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:23:42.611', '2026-03-24 12:23:42.611');
INSERT INTO public."BankStatement" VALUES (84, 6, '2025-12-31 00:00:00', 0, 11.57, 32651.57, 'IIPS Ó©öÓ©¡Ó©üÓ╣ÇÓ©ÜÓ©ÁÓ╣ëÓ©ó', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:23:42.611', '2026-03-24 12:23:42.611');
INSERT INTO public."BankStatement" VALUES (85, 6, '2026-01-30 00:00:00', 32640, 0, 11.57, 'SWCH', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:23:42.611', '2026-03-24 12:23:42.611');
INSERT INTO public."BankStatement" VALUES (86, 3, '2025-12-31 00:00:00', 0, 0.54, 260.4, 'IIPS Ó©öÓ©¡Ó©üÓ╣ÇÓ©ÜÓ©ÁÓ╣ëÓ©ó', NULL, NULL, 'UNMATCHED', 2, '2026-03-24 12:25:16.848', '2026-03-24 12:25:16.848');


--
-- Data for Name: Contractor; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Contractor" VALUES (2, 'Updated', '1234567890123', '456 Road', '0899999999', false, '2026-03-20 03:21:29.453', '2026-03-20 03:21:49.169', 'PERSON');
INSERT INTO public."Contractor" VALUES (1, 'Ó©úÓ╣ëÓ©▓Ó©ÖÓ©ùÓ©öÓ©¬Ó©¡Ó©Ü', '1234567890123', '123 Ó©ûÓ©ÖÓ©ÖÓ©ùÓ©öÓ©¬Ó©¡Ó©Ü', '0812345678', false, '2026-03-20 03:21:23.405', '2026-03-20 03:23:00.109', 'PERSON');
INSERT INTO public."Contractor" VALUES (3, 'Ó©ÜÓ©úÓ©┤Ó©®Ó©▒Ó©ùÓ╣ÇÓ©¬Ó©úÓ©ÁÓ©áÓ©▒Ó©ôÓ©æÓ╣î Ó©êÓ©│Ó©üÓ©▒Ó©ö (Ó©¬Ó©│Ó©ÖÓ©▒Ó©üÓ©çÓ©▓Ó©ÖÓ╣âÓ©½Ó©ìÓ╣ê)', '0215562004745', '31/30 Ó©½Ó©íÓ©╣Ó╣ê 6 Ó©òÓ©│Ó©ÜÓ©ÑÓ╣ÇÓ©èÓ©┤Ó©çÓ╣ÇÓ©ÖÓ©┤Ó©Ö Ó©¡Ó©│Ó╣ÇÓ©áÓ©¡Ó╣ÇÓ©íÓ©ÀÓ©¡Ó©çÓ©úÓ©░Ó©óÓ©¡Ó©ç Ó©êÓ©▒Ó©çÓ©½Ó©ºÓ©▒Ó©öÓ©úÓ©░Ó©óÓ©¡Ó©ç21000', '1111111', true, '2026-03-20 03:24:12.138', '2026-03-20 03:24:12.138', 'PERSON');
INSERT INTO public."Contractor" VALUES (4, 'Ó©ÖÓ©▓Ó©çÓ©ôÓ©▒Ó©ÉÓ©ôÓ©┤Ó©èÓ©▓ Ó©öÓ©▒Ó©èÓ©ûÓ©©Ó©óÓ©▓Ó©ºÓ©▒Ó©òÓ©ú', '1219900533662', '34 / 2 Ó©½Ó©íÓ©╣Ó╣ê 4 Ó©òÓ©│Ó©ÜÓ©ÑÓ╣ÇÓ©èÓ©┤Ó©çÓ╣ÇÓ©ÖÓ©┤Ó©Ö Ó©¡Ó©│Ó╣ÇÓ©áÓ©¡Ó╣ÇÓ©íÓ©ÀÓ©¡Ó©çÓ©úÓ©░Ó©óÓ©¡Ó©ç Ó©êÓ©▒Ó©çÓ©½Ó©ºÓ©▒Ó©öÓ©úÓ©░Ó©óÓ©¡Ó©ç 2100', '111111', true, '2026-03-20 04:17:49.738', '2026-03-20 04:17:49.738', 'PERSON');
INSERT INTO public."Contractor" VALUES (5, 'Ó©ÖÓ©▓Ó©çÓ©èÓ©©Ó©ÑÓ©ÁÓ©×Ó©ú Ó©öÓ©│Ó©úÓ©çÓ©äÓ╣îÓ©èÓ©ÁÓ©×', '3210100446101', '191 / 3 Ó©½Ó©íÓ©╣Ó╣ê 7 Ó©òÓ©│Ó©ÜÓ©ÑÓ╣ÇÓ©èÓ©┤Ó©çÓ╣ÇÓ©ÖÓ©┤Ó©Ö Ó©¡Ó©│Ó╣ÇÓ©áÓ©¡Ó╣ÇÓ©íÓ©ÀÓ©¡Ó©çÓ©úÓ©░Ó©óÓ©¡Ó©ç Ó©êÓ©▒Ó©çÓ©½Ó©ºÓ©▒Ó©öÓ©úÓ©░Ó©óÓ©¡Ó©ç 2100', '11111', true, '2026-03-20 04:18:17.082', '2026-03-20 04:18:17.082', 'PERSON');
INSERT INTO public."Contractor" VALUES (6, 'Ó©üÓ©▓Ó©úÓ©øÓ©úÓ©░Ó©øÓ©▓Ó©¬Ó╣êÓ©ºÓ©ÖÓ©áÓ©╣Ó©íÓ©┤Ó©áÓ©▓Ó©äÓ©¬Ó©▓Ó©éÓ©▓Ó©úÓ©░Ó©óÓ©¡Ó©ç', NULL, '222/22 Ó©½Ó©íÓ©╣Ó╣êÓ©ùÓ©ÁÓ╣ê 5 Ó©ò.Ó╣ÇÓ©èÓ©┤Ó©çÓ╣ÇÓ©ÖÓ©┤Ó©Ö Ó©¡.Ó╣ÇÓ©íÓ©ÀÓ©¡Ó©çÓ©úÓ©░Ó©óÓ©¡Ó©ç Ó©ê.Ó©úÓ©░Ó©óÓ©¡Ó©ç 21000', '038-611116', true, '2026-03-25 10:10:34.72', '2026-03-25 10:10:34.72', 'PERSON');
INSERT INTO public."Contractor" VALUES (7, 'Ó©üÓ©▓Ó©úÓ╣äÓ©ƒÓ©ƒÓ╣ëÓ©▓Ó©¬Ó╣êÓ©ºÓ©ÖÓ©áÓ©╣Ó©íÓ©┤Ó©áÓ©▓Ó©äÓ©êÓ©▒Ó©çÓ©½Ó©ºÓ©▒Ó©öÓ©úÓ©░Ó©óÓ©¡Ó©ç', NULL, 'Ó╣ÇÓ©ÑÓ©éÓ©ùÓ©ÁÓ╣ê 143 Ó©½Ó©íÓ©╣Ó╣êÓ©ùÓ©ÁÓ╣ê 2 Ó©û. Ó©¬Ó©©Ó©éÓ©©Ó©íÓ©ºÓ©┤Ó©ù Ó©ò.Ó╣ÇÓ©ÖÓ©┤Ó©ÖÓ©×Ó©úÓ©░ Ó©¡.Ó╣ÇÓ©íÓ©ÀÓ©¡Ó©ç Ó©ê.Ó©úÓ©░Ó©óÓ©¡Ó©ç 21000', '038613259', true, '2026-03-25 10:14:19.469', '2026-03-25 10:14:19.469', 'PERSON');


--
-- Data for Name: DisbursementGroup; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."DisbursementGroup" VALUES (3, 1, 1, 2182, 0);
INSERT INTO public."DisbursementGroup" VALUES (4, 1, 6, 58630, 1);
INSERT INTO public."DisbursementGroup" VALUES (5, 2, 1, 10744.72, 0);
INSERT INTO public."DisbursementGroup" VALUES (6, 2, 6, 48344, 1);
INSERT INTO public."DisbursementGroup" VALUES (7, 3, 6, 121260, 0);
INSERT INTO public."DisbursementGroup" VALUES (8, 4, 7, 45000, 0);
INSERT INTO public."DisbursementGroup" VALUES (9, 5, 1, 6683, 0);
INSERT INTO public."DisbursementGroup" VALUES (10, 5, 6, 58410, 1);
INSERT INTO public."DisbursementGroup" VALUES (11, 5, 11, 2800, 2);
INSERT INTO public."DisbursementGroup" VALUES (12, 6, 4, 341010, 0);
INSERT INTO public."DisbursementGroup" VALUES (13, 7, 1, 19673.43, 0);
INSERT INTO public."DisbursementGroup" VALUES (14, 7, 4, 4703.72, 1);
INSERT INTO public."DisbursementGroup" VALUES (15, 7, 6, 58630, 2);
INSERT INTO public."DisbursementGroup" VALUES (16, 8, 1, 9165, 0);
INSERT INTO public."DisbursementGroup" VALUES (17, 8, 6, 58300, 1);
INSERT INTO public."DisbursementGroup" VALUES (18, 9, 1, 2603, 0);
INSERT INTO public."DisbursementGroup" VALUES (19, 9, 6, 258190, 1);
INSERT INTO public."DisbursementGroup" VALUES (20, 9, 7, 45000, 2);
INSERT INTO public."DisbursementGroup" VALUES (21, 10, 1, 20310.25, 0);
INSERT INTO public."DisbursementGroup" VALUES (22, 10, 6, 58190, 1);
INSERT INTO public."DisbursementGroup" VALUES (23, 11, 6, 58300, 0);
INSERT INTO public."DisbursementGroup" VALUES (24, 12, 1, 38970.84, 0);
INSERT INTO public."DisbursementGroup" VALUES (25, 12, 4, 38175.93, 1);
INSERT INTO public."DisbursementGroup" VALUES (26, 12, 6, 58300, 2);
INSERT INTO public."DisbursementGroup" VALUES (27, 13, 1, 6800, 0);
INSERT INTO public."DisbursementGroup" VALUES (28, 13, 6, 58300, 1);
INSERT INTO public."DisbursementGroup" VALUES (29, 13, 7, 45000, 2);
INSERT INTO public."DisbursementGroup" VALUES (30, 14, 1, 43515, 0);
INSERT INTO public."DisbursementGroup" VALUES (31, 14, 6, 58410, 1);
INSERT INTO public."DisbursementGroup" VALUES (32, 15, 6, 46728, 0);
INSERT INTO public."DisbursementGroup" VALUES (33, 16, 1, 27286.36, 0);
INSERT INTO public."DisbursementGroup" VALUES (34, 16, 4, 1175.93, 1);
INSERT INTO public."DisbursementGroup" VALUES (35, 16, 6, 58520, 2);
INSERT INTO public."DisbursementGroup" VALUES (36, 17, 1, 54300, 0);
INSERT INTO public."DisbursementGroup" VALUES (37, 17, 5, 32640, 1);
INSERT INTO public."DisbursementGroup" VALUES (38, 17, 6, 58520, 2);
INSERT INTO public."DisbursementGroup" VALUES (39, 18, 1, 5683, 0);
INSERT INTO public."DisbursementGroup" VALUES (40, 18, 6, 58520, 1);
INSERT INTO public."DisbursementGroup" VALUES (41, 19, 1, 2182, 0);
INSERT INTO public."DisbursementGroup" VALUES (42, 19, 6, 58630, 1);


--
-- Data for Name: DisbursementItem; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."DisbursementItem" VALUES (3, 3, 'Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©êÓ©▒Ó©öÓ©ïÓ©ÀÓ╣ëÓ©¡Ó©¡Ó©©Ó©øÓ©üÓ©úÓ©ôÓ╣îÓ©ùÓ©│Ó©äÓ©ºÓ©▓Ó©íÓ©¬Ó©░Ó©¡Ó©▓Ó©öÓ©½Ó╣ëÓ©¡Ó©çÓ©ÖÓ╣ëÓ©│', 2182, 21.82, 2160.18, 'Ó©ÜÓ©úÓ©┤Ó©®Ó©▒Ó©ùÓ╣ÇÓ©¬Ó©úÓ©ÁÓ©áÓ©▒Ó©ôÓ©æÓ╣î Ó©êÓ©│Ó©üÓ©▒Ó©ö (Ó©¬Ó©│Ó©ÖÓ©▒Ó©üÓ©çÓ©▓Ó©ÖÓ╣âÓ©½Ó©ìÓ╣ê)', NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (4, 4, 'Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 9-13 Ó©üÓ©©Ó©íÓ©áÓ©▓Ó©×Ó©▒Ó©ÖÓ©ÿÓ╣î 2569 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58630, 586.3, 58043.7, 'Ó©ÖÓ©▓Ó©çÓ©ôÓ©▒Ó©ÉÓ©ôÓ©┤Ó©èÓ©▓ Ó©öÓ©▒Ó©èÓ©ûÓ©©Ó©óÓ©▓Ó©ºÓ©▒Ó©òÓ©ú, Ó©ÖÓ©▓Ó©çÓ©èÓ©©Ó©ÑÓ©ÁÓ©×Ó©ú Ó©öÓ©│Ó©úÓ©çÓ©äÓ╣îÓ©èÓ©ÁÓ©×', NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (5, 5, '1. Ó©äÓ╣êÓ©▓Ó©ÖÓ╣ëÓ©│Ó╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©üÓ©▒Ó©ÖÓ©óÓ©▓Ó©óÓ©Ö 2568', 744.72, 0, 744.72, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (6, 5, '2. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©ºÓ©▒Ó©ÖÓ©ºÓ©┤Ó©èÓ©▓Ó©üÓ©▓Ó©ú', 10000, 0, 10000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (7, 6, '1. Ó©óÓ©ÀÓ©íÓ╣ÇÓ©çÓ©┤Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 6,7,9,10 Ó©üÓ©▒Ó©ÖÓ©óÓ©▓Ó©óÓ©Ö 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 4 Ó©ºÓ©▒Ó©Ö', 43344, 0, 43344, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (8, 6, '2. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö 29-30 Ó©ü.Ó©ó.2568 - 1-3Ó©ò.Ó©ä.2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 5000, 0, 5000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (9, 7, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö 6,7,9,10 Ó©òÓ©©Ó©ÑÓ©▓Ó©äÓ©í 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 4 Ó©ºÓ©▒Ó©Ö', 4000, 0, 4000, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (10, 7, '2. Ó╣ÇÓ©ÜÓ©┤Ó©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©ÖÓ©äÓ©ÀÓ©ÖÓ╣ÇÓ©ùÓ©¿Ó©ÜÓ©▓Ó©ÑÓ©òÓ©│Ó©ÜÓ©ÑÓ╣ÇÓ©èÓ©┤Ó©çÓ╣ÇÓ©ÖÓ©┤Ó©Ö', 117260, 0, 117260, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (11, 8, '1.Ó╣ÇÓ©ÜÓ©┤Ó©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©êÓ╣ëÓ©▓Ó©çÓ©äÓ©úÓ©╣Ó©¡Ó©▒Ó©òÓ©úÓ©▓Ó©êÓ╣ëÓ©▓Ó©ç Ó╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©òÓ©©Ó©ÑÓ©▓Ó©äÓ©í 2568  Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 3 Ó©äÓ©Ö', 45000, 0, 45000, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (12, 9, '1. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íBig cleaning day', 1683, 0, 1683, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (13, 9, '2. Ó©äÓ╣êÓ©▓Ó©ûÓ╣êÓ©▓Ó©óÓ╣ÇÓ©¡Ó©üÓ©¬Ó©▓Ó©úÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©òÓ©©Ó©ÑÓ©▓Ó©äÓ©í 2568', 5000, 0, 5000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (14, 10, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 3-7 Ó©×Ó©ñÓ©¿Ó©êÓ©┤Ó©üÓ©▓Ó©óÓ©Ö 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58410, 0, 58410, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (15, 11, 'Ó╣ÇÓ©çÓ©┤Ó©ÖÓ©äÓ╣êÓ©▓Ó╣ÇÓ©äÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ╣üÓ©ÜÓ©ÜÓ©ÖÓ©▒Ó©üÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö(Ó╣ÇÓ©×Ó©┤Ó╣êÓ©íÓ╣ÇÓ©òÓ©┤Ó©í) Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 7 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 400 Ó©ÜÓ©▓Ó©ù', 2800, 0, 2800, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (16, 12, 'Ó©¡Ó©ÖÓ©©Ó©ÜÓ©▓Ó©ÑÓ©øÓ©ÁÓ©ùÓ©ÁÓ╣ê2 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 16 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 145', 2320, 0, 2320, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (17, 12, 'Ó©¡Ó©ÖÓ©©Ó©ÜÓ©▓Ó©ÑÓ©øÓ©ÁÓ©ùÓ©ÁÓ╣ê3 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 26 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 145', 3770, 0, 3770, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (18, 12, 'Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 42 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 145', 6090, 0, 6090, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" VALUES (19, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê1/1 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 26 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5720, 0, 5720, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" VALUES (20, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê1/2 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 24 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5280, 0, 5280, NULL, NULL, NULL, NULL, 4);
INSERT INTO public."DisbursementItem" VALUES (21, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê1/3 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 27 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5940, 0, 5940, NULL, NULL, NULL, NULL, 5);
INSERT INTO public."DisbursementItem" VALUES (22, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê2/1 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 27 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5940, 0, 5940, NULL, NULL, NULL, NULL, 6);
INSERT INTO public."DisbursementItem" VALUES (23, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê2/2 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 26 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5720, 0, 5720, NULL, NULL, NULL, NULL, 7);
INSERT INTO public."DisbursementItem" VALUES (24, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê2/3 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 26 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5720, 0, 5720, NULL, NULL, NULL, NULL, 8);
INSERT INTO public."DisbursementItem" VALUES (25, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê3/1 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 25 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5500, 0, 5500, NULL, NULL, NULL, NULL, 9);
INSERT INTO public."DisbursementItem" VALUES (26, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê3/2 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 23 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5060, 0, 5060, NULL, NULL, NULL, NULL, 10);
INSERT INTO public."DisbursementItem" VALUES (27, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê3/3 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 26 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5720, 0, 5720, NULL, NULL, NULL, NULL, 11);
INSERT INTO public."DisbursementItem" VALUES (28, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê4/1 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 29 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 6380, 0, 6380, NULL, NULL, NULL, NULL, 12);
INSERT INTO public."DisbursementItem" VALUES (29, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê4/2 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 29 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 6380, 0, 6380, NULL, NULL, NULL, NULL, 13);
INSERT INTO public."DisbursementItem" VALUES (30, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê4/3 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 30 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 6600, 0, 6600, NULL, NULL, NULL, NULL, 14);
INSERT INTO public."DisbursementItem" VALUES (31, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê5/1 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 27 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5940, 0, 5940, NULL, NULL, NULL, NULL, 15);
INSERT INTO public."DisbursementItem" VALUES (32, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê5/2 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 27 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5940, 0, 5940, NULL, NULL, NULL, NULL, 16);
INSERT INTO public."DisbursementItem" VALUES (33, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê5/3 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 26 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 5720, 0, 5720, NULL, NULL, NULL, NULL, 17);
INSERT INTO public."DisbursementItem" VALUES (34, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê6/1 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 30 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 6600, 0, 6600, NULL, NULL, NULL, NULL, 18);
INSERT INTO public."DisbursementItem" VALUES (35, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê6/2 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 32 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 7040, 0, 7040, NULL, NULL, NULL, NULL, 19);
INSERT INTO public."DisbursementItem" VALUES (36, 12, 'Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©ÁÓ©ùÓ©ÁÓ╣ê6/3 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 29 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 6380, 0, 6380, NULL, NULL, NULL, NULL, 20);
INSERT INTO public."DisbursementItem" VALUES (37, 12, 'Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 489 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 220', 107580, 0, 107580, NULL, NULL, NULL, NULL, 21);
INSERT INTO public."DisbursementItem" VALUES (38, 12, 'Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 531 Ó©äÓ©Ö', 113670, 0, 113670, NULL, NULL, NULL, NULL, 22);
INSERT INTO public."DisbursementItem" VALUES (39, 13, '1. Ó©äÓ╣êÓ©▓Ó╣äÓ©ƒÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©òÓ©©Ó©ÑÓ©▓Ó©äÓ©í 2568', 19000.4, 0, 19000.4, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (40, 13, '2. Ó©äÓ╣êÓ©▓Ó©ÖÓ╣ëÓ©│Ó╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©òÓ©©Ó©ÑÓ©▓Ó©äÓ©í 2568', 342.4, 0, 342.4, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (41, 13, '3. Ó©äÓ╣êÓ©▓Ó╣éÓ©ùÓ©úÓ©¿Ó©▒Ó©×Ó©ùÓ╣îÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©¬Ó©┤Ó©çÓ©½Ó©▓Ó©äÓ©í 2568', 110.21, 0, 110.21, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" VALUES (42, 13, '4. Ó©äÓ╣êÓ©▓Ó╣éÓ©ùÓ©úÓ©¿Ó©▒Ó©×Ó©ùÓ╣îÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©üÓ©▒Ó©ÖÓ©óÓ©▓Ó©óÓ©Ö 2568', 105.93, 0, 105.93, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" VALUES (43, 13, '5. Ó©äÓ╣êÓ©▓Ó╣éÓ©ùÓ©úÓ©¿Ó©▒Ó©×Ó©ùÓ╣îÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©òÓ©©Ó©ÑÓ©▓Ó©äÓ©í 2568', 114.49, 0, 114.49, NULL, NULL, NULL, NULL, 4);
INSERT INTO public."DisbursementItem" VALUES (44, 14, '1. Ó©äÓ╣êÓ©▓Ó©¡Ó©┤Ó©ÖÓ╣ÇÓ©òÓ©¡Ó©úÓ╣îÓ╣ÇÓ©ÖÓ╣çÓ©òÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©üÓ©úÓ©üÓ©ÄÓ©▓Ó©äÓ©í2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (45, 14, '2. Ó©äÓ╣êÓ©▓Ó©¡Ó©┤Ó©ÖÓ╣ÇÓ©òÓ©¡Ó©úÓ╣îÓ╣ÇÓ©ÖÓ╣çÓ©òÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©¬Ó©┤Ó©çÓ©½Ó©▓Ó©äÓ©í2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (46, 14, '3. Ó©äÓ╣êÓ©▓Ó©¡Ó©┤Ó©ÖÓ╣ÇÓ©òÓ©¡Ó©úÓ╣îÓ╣ÇÓ©ÖÓ╣çÓ©òÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©üÓ©▒Ó©ÖÓ©óÓ©▓Ó©óÓ©Ö2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" VALUES (47, 14, '4. Ó©äÓ╣êÓ©▓Ó©¡Ó©┤Ó©ÖÓ╣ÇÓ©òÓ©¡Ó©úÓ╣îÓ╣ÇÓ©ÖÓ╣çÓ©òÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©òÓ©©Ó©ÑÓ©▓Ó©äÓ©í2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" VALUES (48, 15, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 10-14 Ó©×Ó©ñÓ©¿Ó©êÓ©┤Ó©üÓ©▓Ó©óÓ©Ö 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58630, 0, 58630, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (49, 16, '1. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©úÓ©▒Ó©üÓ©áÓ©▓Ó©®Ó©▓', 1250, 0, 1250, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (50, 16, '2. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ╣üÓ©ÜÓ╣êÓ©çÓ╣ÇÓ©éÓ©òÓ╣üÓ©ÜÓ╣êÓ©çÓ©çÓ©▓Ó©Ö', 7915, 0, 7915, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (51, 17, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 17-21 Ó©×Ó©ñÓ©¿Ó©êÓ©┤Ó©üÓ©▓Ó©óÓ©Ö 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58300, 0, 58300, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (52, 18, '1. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ╣ÇÓ©ºÓ©èÓ©áÓ©▒Ó©ôÓ©æÓ╣îÓ©¡Ó©ÖÓ©▓Ó©íÓ©▒Ó©óÓ╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö', 2603, 0, 2603, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (53, 19, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 24-28 Ó©×Ó©ñÓ©¿Ó©êÓ©┤Ó©üÓ©▓Ó©óÓ©Ö 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58190, 0, 58190, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (54, 19, '2 Ó╣ÇÓ©ÜÓ©┤Ó©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ╣ÇÓ©½Ó©ÑÓ©ÀÓ©¡Ó©êÓ╣êÓ©▓Ó©óÓ©øÓ©ÁÓ╣ÇÓ©üÓ╣êÓ©▓Ó©¬Ó╣êÓ©çÓ©¬Ó©│Ó©ÖÓ©▒Ó©üÓ©çÓ©▓Ó©ÖÓ╣ÇÓ©éÓ©òÓ©×Ó©ÀÓ╣ëÓ©ÖÓ©ùÓ©ÁÓ╣êÓ©üÓ©▓Ó©úÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©úÓ©░Ó©óÓ©¡Ó©çÓ╣ÇÓ©éÓ©ò 1', 200000, 0, 200000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (55, 20, '1.Ó╣ÇÓ©ÜÓ©┤Ó©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©êÓ╣ëÓ©▓Ó©çÓ©äÓ©úÓ©╣Ó©¡Ó©▒Ó©òÓ©úÓ©▓Ó©êÓ╣ëÓ©▓Ó©ç Ó╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©×Ó©ñÓ©¿Ó©êÓ©┤Ó©üÓ©▓Ó©óÓ©Ö 2568  Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 3 Ó©äÓ©Ö', 45000, 0, 45000, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (56, 21, '1. Ó╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©óÓ©üÓ©£Ó©ÑÓ©¬Ó©▒Ó©íÓ©ñÓ©ùÓ©ÿÓ©┤Ó╣îÓ©×Ó©┤Ó©èÓ©┤Ó©òÓ©äÓ©ºÓ©▓Ó©íÓ╣ÇÓ©øÓ╣çÓ©ÖÓ╣ÇÓ©ÑÓ©┤Ó©¿ RT,NT,O-NET', 4980, 0, 4980, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (57, 21, '2. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©ïÓ╣êÓ©¡Ó©íÓ╣üÓ©ïÓ©íÓ©äÓ©úÓ©©Ó©áÓ©▒Ó©ôÓ©æÓ╣îÓ╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©Ö', 1200, 0, 1200, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (58, 21, '3. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©ºÓ©▒Ó©ÖÓ©×Ó╣êÓ©¡Ó╣üÓ©½Ó╣êÓ©çÓ©èÓ©▓Ó©òÓ©┤', 1486, 0, 1486, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" VALUES (59, 21, '4. Ó╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©ÖÓ©┤Ó╣ÇÓ©ùÓ©¿Ó©áÓ©▓Ó©óÓ╣âÓ©Ö', 1985, 0, 1985, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" VALUES (60, 21, '5. Ó©äÓ╣êÓ©▓Ó©ûÓ╣êÓ©▓Ó©óÓ╣ÇÓ©¡Ó©üÓ©¬Ó©▓Ó©úÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©×Ó©ñÓ©¿Ó©êÓ©┤Ó©üÓ©▓Ó©óÓ©Ö 2568', 10659.25, 0, 10659.25, NULL, NULL, NULL, NULL, 4);
INSERT INTO public."DisbursementItem" VALUES (61, 22, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê29 Ó©×.Ó©ó.Ó╣üÓ©ÑÓ©░Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 1-4 Ó©ÿ.Ó©ä. 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58190, 0, 58190, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (62, 23, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣êÓ©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 8-12 Ó©ÿ.Ó©ä. 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58300, 0, 58300, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (63, 24, '1. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©¬Ó╣êÓ©çÓ╣ÇÓ©¬Ó©úÓ©┤Ó©íÓ©üÓ©▓Ó©úÓ©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©úÓ©╣Ó╣ëÓ©òÓ©▓Ó©íÓ©½Ó©ÑÓ©▒Ó©üÓ©øÓ©úÓ©▒Ó©èÓ©ìÓ©▓Ó╣ÇÓ©¿Ó©úÓ©®Ó©ÉÓ©üÓ©┤Ó©êÓ©×Ó©¡Ó╣ÇÓ©×Ó©ÁÓ©óÓ©ç', 4744, 0, 4744, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (64, 24, '2. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©¬Ó©úÓ╣ëÓ©▓Ó©çÓ©¬Ó©úÓ©úÓ©äÓ╣îÓ©áÓ©▓Ó©×Ó©óÓ©ÖÓ©òÓ╣îÓ©¬Ó©▒Ó╣ëÓ©ÖÓ©òÓ╣êÓ©¡Ó©òÓ╣ëÓ©▓Ó©ÖÓ©üÓ©▓Ó©úÓ©ùÓ©©Ó©êÓ©úÓ©┤Ó©ò', 3063, 0, 3063, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (65, 24, '3. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©øÓ©úÓ©░Ó©èÓ©▓Ó©¬Ó©▒Ó©íÓ©×Ó©▒Ó©ÖÓ©ÿÓ╣î', 2550, 0, 2550, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" VALUES (66, 24, '4. Ó©äÓ╣êÓ©▓Ó©ÖÓ╣ëÓ©│Ó╣ÇÓ©öÓ©ÀÓ©¡Ó©Ö Ó©×Ó©ñÓ©¿Ó©êÓ©┤Ó©üÓ©▓Ó©óÓ©Ö 2568', 606.69, 0, 606.69, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" VALUES (67, 24, '5. Ó©äÓ╣êÓ©▓Ó╣éÓ©ùÓ©úÓ©¿Ó©▒Ó©×Ó©ùÓ╣îÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©×Ó©ñÓ©¿Ó©êÓ©┤Ó©üÓ©▓Ó©óÓ©Ö 2568', 125.19, 0, 125.19, NULL, NULL, NULL, NULL, 4);
INSERT INTO public."DisbursementItem" VALUES (68, 24, '6.Ó©äÓ╣êÓ©▓Ó╣äÓ©ƒÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©×Ó©ñÓ©¿Ó©êÓ©┤Ó©üÓ©▓Ó©óÓ©Ö 2568', 27881.96, 0, 27881.96, NULL, NULL, NULL, NULL, 5);
INSERT INTO public."DisbursementItem" VALUES (69, 25, '1. Ó©äÓ╣êÓ©▓Ó©¡Ó©┤Ó©ÖÓ╣ÇÓ©òÓ©¡Ó©úÓ╣îÓ╣ÇÓ©ÖÓ╣çÓ©òÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©×Ó©ñÓ©¿Ó©êÓ©┤Ó©üÓ©▓Ó©óÓ©Ö 2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (70, 25, '2. Ó╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úEnglish Camp', 6350, 0, 6350, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (71, 25, '3. Ó╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ╣ÇÓ©éÓ╣ëÓ©▓Ó©äÓ╣êÓ©▓Ó©óÓ©ÑÓ©╣Ó©üÓ╣ÇÓ©¬Ó©ÀÓ©¡ Ó©ø.6', 30650, 0, 30650, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" VALUES (72, 26, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 15-19 Ó©ÿ.Ó©ä. 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58300, 0, 58300, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (73, 27, '1. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©èÓ©©Ó©íÓ©ÖÓ©©Ó©í (Ó©½Ó©ÖÓ©▒Ó©çÓ╣âÓ©½Ó©ìÓ╣ê)', 3000, 0, 3000, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (74, 27, '2. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©¡Ó©ÜÓ©úÓ©íÓ©çÓ©▓Ó©ÖÓ©½Ó©▒Ó©òÓ©ûÓ©¿Ó©┤Ó©ÑÓ©øÓ╣îÓ©ûÓ©┤Ó╣êÓ©ÖÓ©½Ó©ÖÓ©▒Ó©çÓ╣âÓ©½Ó©ìÓ╣ê', 3800, 0, 3800, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (75, 28, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 22-26 Ó©ÿ.Ó©ä. 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58300, 0, 58300, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (76, 29, '1.Ó╣ÇÓ©ÜÓ©┤Ó©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ╣éÓ©äÓ©úÓ©çÓ©üÓ©▓Ó©úÓ©êÓ╣ëÓ©▓Ó©çÓ©äÓ©úÓ©╣Ó©¡Ó©▒Ó©òÓ©úÓ©▓Ó©êÓ╣ëÓ©▓Ó©ç Ó╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©ÿÓ©▒Ó©ÖÓ©ºÓ©▓Ó©äÓ©í 2568  Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 3 Ó©äÓ©Ö', 45000, 0, 45000, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (77, 30, '1. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©¬Ó©ÖÓ©▒Ó©ÜÓ©¬Ó©ÖÓ©©Ó©ÖÓ©üÓ©▓Ó©úÓ©ÜÓ©úÓ©┤Ó©½Ó©▓Ó©úÓ©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ╣üÓ©ÑÓ©░Ó©üÓ©▓Ó©úÓ©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©úÓ©╣Ó╣ë(Ó╣éÓ©øÓ©úÓ╣ÇÓ©êÓ©äÓ╣ÇÓ©òÓ©¡Ó©úÓ╣î)', 18500, 0, 18500, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (78, 30, '2. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©×Ó©▒Ó©ÆÓ©ÖÓ©▓Ó©ÖÓ©▒Ó©üÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ùÓ©ÁÓ╣êÓ©íÓ©ÁÓ©áÓ©▓Ó©ºÓ©░Ó©ûÓ©¡Ó©ûÓ©¡Ó©óÓ©ùÓ©▓Ó©çÓ©üÓ©▓Ó©úÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©úÓ©╣Ó╣ëÓ©öÓ╣ëÓ©▓Ó©ÖÓ©áÓ©▓Ó©®Ó©▓Ó╣äÓ©ùÓ©ó', 3000, 0, 3000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (79, 30, '3. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©×Ó©▒Ó©ÆÓ©ÖÓ©▓Ó©üÓ©▓Ó©úÓ©ºÓ©▒Ó©öÓ╣üÓ©ÑÓ©░Ó©øÓ©úÓ©░Ó╣ÇÓ©íÓ©┤Ó©ÖÓ©£Ó©Ñ', 500, 0, 500, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" VALUES (80, 30, '4. Ó©äÓ╣êÓ©▓Ó©ûÓ╣êÓ©▓Ó©óÓ╣ÇÓ©¡Ó©üÓ©¬Ó©▓Ó©úÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©ÿÓ©▒Ó©ÖÓ©ºÓ©▓Ó©äÓ©í 2568', 5000, 0, 5000, NULL, NULL, NULL, NULL, 3);
INSERT INTO public."DisbursementItem" VALUES (81, 30, '5. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©ºÓ©▒Ó©ÖÓ╣ÇÓ©öÓ╣çÓ©üÓ╣üÓ©½Ó╣êÓ©çÓ©èÓ©▓Ó©òÓ©┤', 15000, 0, 15000, NULL, NULL, NULL, NULL, 4);
INSERT INTO public."DisbursementItem" VALUES (82, 30, '6. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ╣ÇÓ©öÓ╣çÓ©üÓ©öÓ©ÁÓ©¿Ó©úÓ©ÁÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', 1515, 0, 1515, NULL, NULL, NULL, NULL, 5);
INSERT INTO public."DisbursementItem" VALUES (83, 31, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 5-9 Ó©íÓ©üÓ©úÓ©▓Ó©äÓ©í 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58410, 0, 58410, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (84, 32, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê12-15 Ó©íÓ©üÓ©úÓ©▓Ó©äÓ©í 2568 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 4 Ó©ºÓ©▒Ó©Ö', 46728, 0, 46728, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (85, 33, '1. Ó©äÓ╣êÓ©▓Ó╣äÓ©ƒÓ©ƒÓ╣ëÓ©▓Ó╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©ÿÓ©▒Ó©ÖÓ©ºÓ©▓Ó©äÓ©í 2568', 26630.45, 0, 26630.45, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (86, 33, '2. Ó©äÓ╣êÓ©▓Ó©ÖÓ╣ëÓ©│Ó╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©ÿÓ©▒Ó©ÖÓ©ºÓ©▓Ó©äÓ©í 2568', 539.28, 0, 539.28, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (87, 33, '3. Ó©äÓ╣êÓ©▓Ó╣éÓ©ùÓ©úÓ©¿Ó©▒Ó©×Ó©ùÓ╣îÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©ÿÓ©▒Ó©ÖÓ©ºÓ©▓Ó©äÓ©í 2568', 116.63, 0, 116.63, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" VALUES (88, 34, '1. Ó©äÓ╣êÓ©▓Ó©¡Ó©┤Ó©ÖÓ╣ÇÓ©òÓ©¡Ó©úÓ╣îÓ╣ÇÓ©ÖÓ╣çÓ©òÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©ÿÓ©▒Ó©ÖÓ©ºÓ©▓Ó©äÓ©í 2568', 1175.93, 0, 1175.93, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (89, 35, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 19-23 Ó©íÓ©üÓ©úÓ©▓Ó©äÓ©í 2569 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58520, 0, 58520, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (90, 36, '1. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©øÓ©úÓ©░Ó©èÓ©▓Ó©¬Ó©▒Ó©íÓ©×Ó©▒Ó©ÖÓ©ÿÓ╣î', 3300, 0, 3300, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (91, 36, '2. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©¬Ó©ÖÓ©▒Ó©ÜÓ©¬Ó©ÖÓ©©Ó©ÖÓ©üÓ©▓Ó©úÓ©ÜÓ©úÓ©┤Ó©½Ó©▓Ó©úÓ©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ╣üÓ©ÑÓ©░Ó©üÓ©▓Ó©úÓ©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©úÓ©╣Ó╣ë', 34000, 0, 34000, NULL, NULL, NULL, NULL, 1);
INSERT INTO public."DisbursementItem" VALUES (92, 36, '3. Ó©ùÓ©©Ó©ÖÓ©øÓ©▒Ó©êÓ©êÓ©▒Ó©óÓ©×Ó©ÀÓ╣ëÓ©ÖÓ©ÉÓ©▓Ó©ÖÓ©ÖÓ©▒Ó©üÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©óÓ©▓Ó©üÓ©êÓ©Ö Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 34 Ó©ùÓ©©Ó©Ö Ó©ùÓ©©Ó©ÖÓ©ÑÓ©░ 500 Ó©ÜÓ©▓Ó©ù', 17000, 0, 17000, NULL, NULL, NULL, NULL, 2);
INSERT INTO public."DisbursementItem" VALUES (93, 37, '1. Ó©ùÓ©©Ó©Ö Ó©üÓ©¬Ó©¿.Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 17 Ó©äÓ©Ö Ó©äÓ©ÖÓ©ÑÓ©░ 1,920 Ó©ÜÓ©▓Ó©ù', 32640, 0, 32640, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (94, 38, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 26-30  Ó©íÓ©üÓ©úÓ©▓Ó©äÓ©í 2569 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58520, 0, 58520, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (95, 39, '1. Ó©äÓ╣êÓ©▓Ó©ûÓ╣êÓ©▓Ó©óÓ╣ÇÓ©¡Ó©üÓ©¬Ó©▓Ó©úÓ╣ÇÓ©öÓ©ÀÓ©¡Ó©ÖÓ©íÓ©üÓ©úÓ©▓Ó©äÓ©í 2569', 5683, 0, 5683, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (96, 40, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 2-6 Ó©üÓ©©Ó©íÓ©áÓ©▓Ó©×Ó©▒Ó©ÖÓ©ÿÓ╣î 2569 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58520, 0, 58520, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (97, 41, '1. Ó©üÓ©┤Ó©êÓ©üÓ©úÓ©úÓ©íÓ©êÓ©▒Ó©öÓ©ïÓ©ÀÓ╣ëÓ©¡Ó©¡Ó©©Ó©øÓ©üÓ©úÓ©ôÓ╣îÓ©ùÓ©│Ó©äÓ©ºÓ©▓Ó©íÓ©¬Ó©░Ó©¡Ó©▓Ó©öÓ©½Ó╣ëÓ©¡Ó©çÓ©ÖÓ╣ëÓ©│', 2182, 0, 2182, NULL, NULL, NULL, NULL, 0);
INSERT INTO public."DisbursementItem" VALUES (98, 42, '1. Ó©äÓ╣êÓ©▓Ó©êÓ╣ëÓ©▓Ó©çÓ╣ÇÓ©½Ó©íÓ©▓Ó©ÜÓ©úÓ©┤Ó©üÓ©▓Ó©úÓ©ùÓ©│Ó©¡Ó©▓Ó©½Ó©▓Ó©úÓ©üÓ©ÑÓ©▓Ó©çÓ©ºÓ©▒Ó©Ö Ó©ºÓ©▒Ó©ÖÓ©ùÓ©ÁÓ╣ê 9-13 Ó©üÓ©©Ó©íÓ©áÓ©▓Ó©×Ó©▒Ó©ÖÓ©ÿÓ╣î 2569 Ó©êÓ©│Ó©ÖÓ©ºÓ©Ö 5 Ó©ºÓ©▒Ó©Ö', 58630, 0, 58630, NULL, NULL, NULL, NULL, 0);


--
-- Data for Name: MoneyTransaction; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: PaymentRecord; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."PaymentRecord" VALUES (3, 4, '2026-03-20 00:00:00', NULL, 'Ó©ÖÓ©▓Ó©çÓ©èÓ©©Ó©ÑÓ©ÁÓ©×Ó©ú Ó©öÓ©│Ó©úÓ©çÓ©äÓ╣îÓ©èÓ©ÁÓ©×', 38630, 1, 386.3, 38243.7, '3', '2026-03-19 17:00:00', '2026-03-20 10:24:44.527');
INSERT INTO public."PaymentRecord" VALUES (1, 3, '2026-03-20 00:00:00', NULL, 'Ó©ÜÓ©úÓ©┤Ó©®Ó©▒Ó©ùÓ╣ÇÓ©¬Ó©úÓ©ÁÓ©áÓ©▒Ó©ôÓ©æÓ╣î Ó©êÓ©│Ó©üÓ©▒Ó©ö (Ó©¬Ó©│Ó©ÖÓ©▒Ó©üÓ©çÓ©▓Ó©ÖÓ╣âÓ©½Ó©ìÓ╣ê)', 2182, 1, 21.82, 2160.18, '1', '2026-03-19 17:00:00', '2026-03-20 10:24:44.517');
INSERT INTO public."PaymentRecord" VALUES (2, 4, '2026-03-20 00:00:00', NULL, 'Ó©ÖÓ©▓Ó©çÓ©ôÓ©▒Ó©ÉÓ©ôÓ©┤Ó©èÓ©▓ Ó©öÓ©▒Ó©èÓ©ûÓ©©Ó©óÓ©▓Ó©ºÓ©▒Ó©òÓ©ú', 20000, 1, 200, 19800, '2', '2026-03-19 17:00:00', '2026-03-20 10:24:44.526');


--
-- Data for Name: Permission; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Permission" VALUES (1, 'disbursement', 'view', 'Ó©öÓ©╣Ó©úÓ©▓Ó©óÓ©üÓ©▓Ó©úÓ╣ÇÓ©ÜÓ©┤Ó©üÓ©êÓ╣êÓ©▓Ó©ó');
INSERT INTO public."Permission" VALUES (2, 'disbursement', 'create', 'Ó©¬Ó©úÓ╣ëÓ©▓Ó©çÓ©úÓ©▓Ó©óÓ©üÓ©▓Ó©úÓ╣ÇÓ©ÜÓ©┤Ó©üÓ©êÓ╣êÓ©▓Ó©ó');
INSERT INTO public."Permission" VALUES (3, 'disbursement', 'edit', 'Ó╣üÓ©üÓ╣ëÓ╣äÓ©éÓ©úÓ©▓Ó©óÓ©üÓ©▓Ó©úÓ╣ÇÓ©ÜÓ©┤Ó©üÓ©êÓ╣êÓ©▓Ó©ó');
INSERT INTO public."Permission" VALUES (4, 'disbursement', 'delete', 'Ó©ÑÓ©ÜÓ©úÓ©▓Ó©óÓ©üÓ©▓Ó©úÓ╣ÇÓ©ÜÓ©┤Ó©üÓ©êÓ╣êÓ©▓Ó©ó');
INSERT INTO public."Permission" VALUES (5, 'disbursement', 'workflow', 'Ó©¬Ó╣êÓ©çÓ©úÓ©▓Ó©óÓ©üÓ©▓Ó©úÓ╣ÇÓ©éÓ╣ëÓ©▓Ó©üÓ©úÓ©░Ó©ÜÓ©ºÓ©ÖÓ©üÓ©▓Ó©úÓ©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤');
INSERT INTO public."Permission" VALUES (6, 'approval', 'view', 'Ó©öÓ©╣Ó©úÓ©▓Ó©óÓ©üÓ©▓Ó©úÓ©úÓ©¡Ó©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤');
INSERT INTO public."Permission" VALUES (7, 'approval', 'approve', 'Ó©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤Ó©úÓ©▓Ó©óÓ©üÓ©▓Ó©úÓ╣ÇÓ©ÜÓ©┤Ó©üÓ©êÓ╣êÓ©▓Ó©ó');
INSERT INTO public."Permission" VALUES (8, 'balance', 'view', 'Ó©öÓ©╣Ó©úÓ©▓Ó©óÓ©çÓ©▓Ó©ÖÓ©óÓ©¡Ó©íÓ©äÓ©çÓ╣ÇÓ©½Ó©ÑÓ©ÀÓ©¡');
INSERT INTO public."Permission" VALUES (9, 'balance', 'manage', 'Ó©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ©óÓ©¡Ó©öÓ©äÓ©çÓ╣ÇÓ©½Ó©ÑÓ©ÀÓ©¡');
INSERT INTO public."Permission" VALUES (10, 'tax', 'view', 'Ó©öÓ©╣Ó©éÓ╣ëÓ©¡Ó©íÓ©╣Ó©ÑÓ©áÓ©▓Ó©®Ó©Á');
INSERT INTO public."Permission" VALUES (11, 'tax', 'manage', 'Ó©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ©éÓ╣ëÓ©¡Ó©íÓ©╣Ó©ÑÓ©áÓ©▓Ó©®Ó©Á');
INSERT INTO public."Permission" VALUES (12, 'report', 'view', 'Ó©öÓ©╣Ó©úÓ©▓Ó©óÓ©çÓ©▓Ó©Ö');
INSERT INTO public."Permission" VALUES (13, 'print', 'print', 'Ó©×Ó©┤Ó©íÓ©×Ó╣îÓ╣ÇÓ©¡Ó©üÓ©¬Ó©▓Ó©ú');
INSERT INTO public."Permission" VALUES (14, 'admin', 'users', 'Ó©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ©£Ó©╣Ó╣ëÓ╣âÓ©èÓ╣ëÓ©çÓ©▓Ó©Ö');
INSERT INTO public."Permission" VALUES (15, 'admin', 'roles', 'Ó©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ©ÜÓ©ùÓ©ÜÓ©▓Ó©ù');
INSERT INTO public."Permission" VALUES (16, 'admin', 'settings', 'Ó©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ©üÓ©▓Ó©úÓ©òÓ©▒Ó╣ëÓ©çÓ©äÓ╣êÓ©▓Ó©úÓ©░Ó©ÜÓ©Ü');
INSERT INTO public."Permission" VALUES (17, 'bank_account', 'manage', 'Ó©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ©ÜÓ©▒Ó©ìÓ©èÓ©ÁÓ©ÿÓ©ÖÓ©▓Ó©äÓ©▓Ó©ú');
INSERT INTO public."Permission" VALUES (18, 'budget_type', 'manage', 'Ó©êÓ©▒Ó©öÓ©üÓ©▓Ó©úÓ©øÓ©úÓ©░Ó╣ÇÓ©áÓ©ùÓ╣ÇÓ©çÓ©┤Ó©Ö');
INSERT INTO public."Permission" VALUES (19, 'transaction', 'view', 'Ó©öÓ©╣Ó©úÓ©▓Ó©óÓ©üÓ©▓Ó©úÓ╣ÇÓ©çÓ©┤Ó©ÖÓ╣ÇÓ©äÓ©ÑÓ©ÀÓ╣êÓ©¡Ó©ÖÓ╣äÓ©½Ó©º');
INSERT INTO public."Permission" VALUES (20, 'transaction', 'create', 'Ó©ÜÓ©▒Ó©ÖÓ©ùÓ©ÂÓ©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ╣ÇÓ©éÓ╣ëÓ©▓');
INSERT INTO public."Permission" VALUES (21, 'reconciliation', 'manage', 'Ó©üÓ©úÓ©░Ó©ùÓ©ÜÓ©óÓ©¡Ó©ö');
INSERT INTO public."Permission" VALUES (22, 'reconciliation', 'view', 'Ó©öÓ©╣Ó©£Ó©ÑÓ©üÓ©úÓ©░Ó©ùÓ©ÜÓ©óÓ©¡Ó©ö');


--
-- Data for Name: Reconciliation; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: RolePermission; Type: TABLE DATA; Schema: public; Owner: -
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
-- Data for Name: SchoolInfo; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."SchoolInfo" VALUES (1, 'school_department', 'Ó©¬Ó©▒Ó©çÓ©üÓ©▒Ó©öÓ©¬Ó©│Ó©ÖÓ©▒Ó©üÓ©çÓ©▓Ó©ÖÓ╣ÇÓ©éÓ©òÓ©×Ó©ÀÓ╣ëÓ©ÖÓ©ùÓ©ÁÓ╣êÓ©üÓ©▓Ó©úÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©øÓ©úÓ©░Ó©ûÓ©íÓ©¿Ó©ÂÓ©üÓ©®Ó©▓Ó©úÓ©░Ó©óÓ©¡Ó©çÓ╣ÇÓ©éÓ©ò 1', '2026-03-25 10:06:55.767');
INSERT INTO public."SchoolInfo" VALUES (2, 'school_name', 'Ó╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ºÓ©▒Ó©öÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', '2026-03-25 10:06:55.774');
INSERT INTO public."SchoolInfo" VALUES (3, 'school_address', '60/7 Ó©½Ó©íÓ©╣Ó╣ê 4 Ó©òÓ©│Ó©ÜÓ©ÑÓ╣ÇÓ©èÓ©┤Ó©çÓ╣ÇÓ©ÖÓ©┤Ó©Ö Ó©¡Ó©│Ó╣ÇÓ©áÓ©¡Ó╣ÇÓ©íÓ©ÀÓ©¡Ó©çÓ©úÓ©░Ó©óÓ©¡Ó©ç Ó©êÓ©▒Ó©çÓ©½Ó©ºÓ©▒Ó©öÓ©úÓ©░Ó©óÓ©¡Ó©ç 21000', '2026-03-25 10:06:55.776');
INSERT INTO public."SchoolInfo" VALUES (4, 'school_tax_id', '0994000264968', '2026-03-25 10:06:55.778');
INSERT INTO public."SchoolInfo" VALUES (5, 'school_phone', '038', '2026-03-25 10:06:55.78');
INSERT INTO public."SchoolInfo" VALUES (6, 'vice_principal_1_name', 'Ó©ÖÓ©▓Ó©çÓ©áÓ©äÓ©ºÓ©úÓ©úÓ©ô  Ó©íÓ©ÁÓ╣ÇÓ©êÓ©úÓ©┤Ó©ì', '2026-03-25 10:06:55.782');
INSERT INTO public."SchoolInfo" VALUES (7, 'vice_principal_1_position', 'Ó©úÓ©¡Ó©çÓ©£Ó©╣Ó╣ëÓ©¡Ó©│Ó©ÖÓ©ºÓ©óÓ©üÓ©▓Ó©úÓ╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ºÓ©▒Ó©öÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', '2026-03-25 10:06:55.784');
INSERT INTO public."SchoolInfo" VALUES (8, 'principal_name', 'Ó©ÖÓ©▓Ó©çÓ©¬Ó©▓Ó©ºÓ©ºÓ©┤Ó©áÓ©▓Ó©×Ó©úÓ©úÓ©ô Ó©¡Ó©©Ó©ÜÓ©Ñ', '2026-03-25 10:06:55.786');
INSERT INTO public."SchoolInfo" VALUES (9, 'principal_position', ' Ó©£Ó©╣Ó╣ëÓ©¡Ó©│Ó©ÖÓ©ºÓ©óÓ©üÓ©▓Ó©úÓ╣éÓ©úÓ©çÓ╣ÇÓ©úÓ©ÁÓ©óÓ©ÖÓ©ºÓ©▒Ó©öÓ©ÜÓ╣ëÓ©▓Ó©ÖÓ©öÓ©¡Ó©Ö', '2026-03-25 10:06:55.793');
INSERT INTO public."SchoolInfo" VALUES (10, 'finance_officer_name', 'Ó©ÖÓ©▓Ó©çÓ©íÓ©ôÓ©æÓ©┤Ó©úÓ©▓  Ó©¬Ó©▓Ó©óÓ©óÓ©¿', '2026-03-25 10:06:55.812');
INSERT INTO public."SchoolInfo" VALUES (11, 'finance_officer_position', 'Ó©äÓ©úÓ©╣Ó©èÓ©│Ó©ÖÓ©▓Ó©ìÓ©üÓ©▓Ó©úÓ©×Ó©┤Ó╣ÇÓ©¿Ó©®', '2026-03-25 10:06:55.815');
INSERT INTO public."SchoolInfo" VALUES (12, 'committee_1_name', 'Ó©ÖÓ©▓Ó©çÓ©¡Ó©▓Ó©úÓ©ÁÓ©óÓ╣î Ó©×Ó©▒Ó©èÓ©úÓ©ÖÓ©ñÓ©íÓ©Ñ', '2026-03-25 10:06:55.817');
INSERT INTO public."SchoolInfo" VALUES (13, 'committee_1_position', 'Ó©üÓ©úÓ©úÓ©íÓ©üÓ©▓Ó©ú', '2026-03-25 10:06:55.819');
INSERT INTO public."SchoolInfo" VALUES (14, 'committee_2_name', 'Ó©ÖÓ©▓Ó©çÓ©ÿÓ©▒Ó©ìÓ©¬Ó©┤Ó©ÖÓ©Á Ó©êÓ©▒Ó©ÖÓ©ùÓ©úÓ╣îÓ©ÜÓ©©Ó©òÓ©ú', '2026-03-25 10:06:55.821');
INSERT INTO public."SchoolInfo" VALUES (15, 'committee_2_position', 'Ó©üÓ©úÓ©úÓ©íÓ©üÓ©▓Ó©ú', '2026-03-25 10:06:55.822');
INSERT INTO public."SchoolInfo" VALUES (16, 'committee_3_name', 'Ó©ÖÓ©▓Ó©çÓ©¬Ó©▓Ó©ºÓ©úÓ©▒Ó©òÓ©ÖÓ©▓ Ó©ÜÓ©│Ó©úÓ©©Ó©çÓ©êÓ©▒Ó©ÖÓ©ùÓ©úÓ╣î', '2026-03-25 10:06:55.824');
INSERT INTO public."SchoolInfo" VALUES (17, 'committee_3_position', 'Ó©üÓ©úÓ©úÓ©íÓ©üÓ©▓Ó©ú', '2026-03-25 10:06:55.826');


--
--



--
-- Data for Name: TaxCertificate; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: TaxPaymentSummary; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: TaxSubmission; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: WorkflowAction; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."WorkflowAction" VALUES (1, 1, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'CREATE', 'Ó©¬Ó©úÓ╣ëÓ©▓Ó©çÓ©ÜÓ©▒Ó©ÖÓ©ùÓ©ÂÓ©üÓ©éÓ©¡Ó©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤Ó╣âÓ©½Ó©íÓ╣ê', 2, '2026-03-20 03:29:39.108');
INSERT INTO public."WorkflowAction" VALUES (2, 1, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-20 03:30:08.752');
INSERT INTO public."WorkflowAction" VALUES (3, 1, 2, 'Ó©ùÓ©│Ó©½Ó©ÖÓ©▒Ó©çÓ©¬Ó©ÀÓ©¡Ó©éÓ©¡Ó©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤', 'APPROVE', 'Ó©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤Ó©¡Ó©▒Ó©òÓ╣éÓ©ÖÓ©íÓ©▒Ó©òÓ©┤ (Ó╣éÓ©½Ó©íÓ©öÓ©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤Ó©òÓ©ÖÓ╣ÇÓ©¡Ó©ç)', 2, '2026-03-20 03:30:08.754');
INSERT INTO public."WorkflowAction" VALUES (4, 1, 3, 'Ó╣ÇÓ©ÜÓ©┤Ó©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©ùÓ©ÁÓ╣êÓ©ÿÓ©ÖÓ©▓Ó©äÓ©▓Ó©ú', 'COMPLETE', NULL, 2, '2026-03-20 03:46:39.56');
INSERT INTO public."WorkflowAction" VALUES (5, 1, 4, 'Ó©ÖÓ©│Ó©êÓ╣êÓ©▓Ó©óÓ©£Ó©╣Ó╣ëÓ©úÓ©▒Ó©ÜÓ©êÓ╣ëÓ©▓Ó©ç', 'COMPLETE', NULL, 2, '2026-03-20 04:40:17.471');
INSERT INTO public."WorkflowAction" VALUES (6, 1, 5, 'Ó©¡Ó©¡Ó©üÓ╣âÓ©Ü 50 Ó©ùÓ©ºÓ©┤', 'COMPLETE', NULL, 2, '2026-03-20 04:40:32.089');
INSERT INTO public."WorkflowAction" VALUES (7, 1, 6, '', 'REVERSE', NULL, 2, '2026-03-20 05:10:00.618');
INSERT INTO public."WorkflowAction" VALUES (8, 1, 5, '', 'REVERSE', NULL, 2, '2026-03-20 05:10:29.735');
INSERT INTO public."WorkflowAction" VALUES (9, 1, 4, 'Admin Ó╣üÓ©üÓ╣ëÓ╣äÓ©é: COMPLETED(Step 4) ÔåÆ DRAFT(Step 1)', 'ADMIN_OVERRIDE', 'Admin test override', 5, '2026-03-20 05:37:24.373');
INSERT INTO public."WorkflowAction" VALUES (10, 1, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 5, '2026-03-20 05:37:48.444');
INSERT INTO public."WorkflowAction" VALUES (11, 1, 2, 'Ó©éÓ©¡Ó©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤', 'APPROVE', 'Ó©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤Ó©¡Ó©▒Ó©òÓ╣éÓ©ÖÓ©íÓ©▒Ó©òÓ©┤ (Ó╣éÓ©½Ó©íÓ©öÓ©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤Ó©òÓ©ÖÓ╣ÇÓ©¡Ó©ç)', 5, '2026-03-20 05:37:48.446');
INSERT INTO public."WorkflowAction" VALUES (12, 1, 3, 'Ó╣ÇÓ©ÜÓ©┤Ó©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©ùÓ©ÁÓ╣êÓ©ÿÓ©ÖÓ©▓Ó©äÓ©▓Ó©ú', 'COMPLETE', NULL, 5, '2026-03-20 05:38:00.418');
INSERT INTO public."WorkflowAction" VALUES (13, 1, 4, 'Ó©ÖÓ©│Ó©êÓ╣êÓ©▓Ó©óÓ©£Ó©╣Ó╣ëÓ©úÓ©▒Ó©ÜÓ©êÓ╣ëÓ©▓Ó©ç', 'COMPLETE', NULL, 5, '2026-03-20 05:40:37.881');
INSERT INTO public."WorkflowAction" VALUES (14, 1, 4, 'Admin Ó╣üÓ©üÓ╣ëÓ╣äÓ©é: COMPLETED(Step 4) ÔåÆ DRAFT(Step 1)', 'ADMIN_OVERRIDE', 'Admin test', 5, '2026-03-20 05:41:23.347');
INSERT INTO public."WorkflowAction" VALUES (15, 1, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 5, '2026-03-20 05:44:48.49');
INSERT INTO public."WorkflowAction" VALUES (16, 1, 2, 'Ó©éÓ©¡Ó©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤', 'APPROVE', 'Ó©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤Ó©¡Ó©▒Ó©òÓ╣éÓ©ÖÓ©íÓ©▒Ó©òÓ©┤ (Ó╣éÓ©½Ó©íÓ©öÓ©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤Ó©òÓ©ÖÓ╣ÇÓ©¡Ó©ç)', 5, '2026-03-20 05:44:48.491');
INSERT INTO public."WorkflowAction" VALUES (17, 1, 3, 'Ó╣ÇÓ©ÜÓ©┤Ó©üÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©ùÓ©ÁÓ╣êÓ©ÿÓ©ÖÓ©▓Ó©äÓ©▓Ó©ú', 'COMPLETE', NULL, 5, '2026-03-20 05:44:51.779');
INSERT INTO public."WorkflowAction" VALUES (18, 1, 4, 'Ó©ÖÓ©│Ó©êÓ╣êÓ©▓Ó©óÓ©£Ó©╣Ó╣ëÓ©úÓ©▒Ó©ÜÓ©êÓ╣ëÓ©▓Ó©ç', 'COMPLETE', NULL, 2, '2026-03-20 05:50:16.993');
INSERT INTO public."WorkflowAction" VALUES (19, 1, 4, 'Admin Ó╣üÓ©üÓ╣ëÓ╣äÓ©é: COMPLETED(Step 4) ÔåÆ COMPLETED(Step 4)', 'ADMIN_OVERRIDE', 'Ó©ùÓ©öÓ©¬Ó©¡Ó©Ü', 5, '2026-03-20 06:04:25.71');
INSERT INTO public."WorkflowAction" VALUES (20, 1, 4, 'Admin Ó╣üÓ©üÓ╣ëÓ╣äÓ©é: COMPLETED(Step 4) ÔåÆ WITHDRAWN(Step 4)', 'ADMIN_OVERRIDE', 'Ó©ùÓ©üÓ©¬Ó©¡Ó©Ü', 5, '2026-03-20 06:04:57.634');
INSERT INTO public."WorkflowAction" VALUES (21, 1, 4, 'Ó©ÖÓ©│Ó©êÓ╣êÓ©▓Ó©óÓ©£Ó©╣Ó╣ëÓ©úÓ©▒Ó©ÜÓ©êÓ╣ëÓ©▓Ó©ç', 'COMPLETE', NULL, 2, '2026-03-20 06:06:22.221');
INSERT INTO public."WorkflowAction" VALUES (22, 1, 4, 'Admin Ó╣üÓ©üÓ╣ëÓ╣äÓ©é: COMPLETED(Step 4) ÔåÆ WITHDRAWN(Step 4)', 'ADMIN_OVERRIDE', 'Ó©ùÓ©öÓ©¬Ó©¡Ó©Ü', 5, '2026-03-20 10:21:21.312');
INSERT INTO public."WorkflowAction" VALUES (23, 1, 4, 'Ó©ÖÓ©│Ó©êÓ╣êÓ©▓Ó©óÓ©£Ó©╣Ó╣ëÓ©úÓ©▒Ó©ÜÓ©êÓ╣ëÓ©▓Ó©ç', 'COMPLETE', NULL, 2, '2026-03-20 10:24:44.53');
INSERT INTO public."WorkflowAction" VALUES (24, 2, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.018');
INSERT INTO public."WorkflowAction" VALUES (25, 3, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.091');
INSERT INTO public."WorkflowAction" VALUES (26, 4, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.097');
INSERT INTO public."WorkflowAction" VALUES (27, 5, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.102');
INSERT INTO public."WorkflowAction" VALUES (28, 6, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.11');
INSERT INTO public."WorkflowAction" VALUES (29, 7, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.122');
INSERT INTO public."WorkflowAction" VALUES (30, 8, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.13');
INSERT INTO public."WorkflowAction" VALUES (31, 9, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.136');
INSERT INTO public."WorkflowAction" VALUES (32, 10, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.144');
INSERT INTO public."WorkflowAction" VALUES (33, 11, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.15');
INSERT INTO public."WorkflowAction" VALUES (34, 12, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.155');
INSERT INTO public."WorkflowAction" VALUES (35, 13, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.164');
INSERT INTO public."WorkflowAction" VALUES (36, 14, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.171');
INSERT INTO public."WorkflowAction" VALUES (37, 15, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.177');
INSERT INTO public."WorkflowAction" VALUES (38, 16, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.182');
INSERT INTO public."WorkflowAction" VALUES (39, 17, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.19');
INSERT INTO public."WorkflowAction" VALUES (40, 18, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.197');
INSERT INTO public."WorkflowAction" VALUES (41, 19, 1, 'Ó©óÓ©ÀÓ╣êÓ©ÖÓ╣ÇÓ©úÓ©ÀÓ╣êÓ©¡Ó©çÓ©éÓ©¡Ó©çÓ©Ü', 'SUBMIT', NULL, 2, '2026-03-24 12:34:18.202');
INSERT INTO public."WorkflowAction" VALUES (42, 1, 4, 'Admin Ó╣üÓ©üÓ╣ëÓ╣äÓ©é: COMPLETED(Step 4) ÔåÆ WITHDRAWN(Step 4)', 'ADMIN_OVERRIDE', 'Ó©ÑÓ©çÓ©éÓ╣ëÓ©¡Ó©íÓ©╣Ó©ÑÓ╣âÓ©½Ó©íÓ╣ê Ó©êÓ©▓Ó©üÓ©üÓ©▓Ó©úÓ©ùÓ©öÓ©¬Ó©¡Ó©Ü', 5, '2026-03-25 10:15:41.388');


--
-- Data for Name: WorkflowSetting; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."WorkflowSetting" VALUES (1, 'approval_mode', 'self', 'Ó╣éÓ©½Ó©íÓ©öÓ©üÓ©▓Ó©úÓ©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤: self = Ó©äÓ©úÓ©╣Ó©üÓ©▓Ó©úÓ╣ÇÓ©çÓ©┤Ó©ÖÓ©ùÓ©│Ó╣ÇÓ©¡Ó©ç, approval = Ó©òÓ╣ëÓ©¡Ó©çÓ©£Ó╣êÓ©▓Ó©ÖÓ©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤', '2026-03-20 02:36:14.388');
INSERT INTO public."WorkflowSetting" VALUES (2, 'approval_steps', 'principal', 'Ó©éÓ©▒Ó╣ëÓ©ÖÓ©òÓ©¡Ó©ÖÓ©¡Ó©ÖÓ©©Ó©íÓ©▒Ó©òÓ©┤: vice_principal, principal, both', '2026-03-20 02:36:14.394');


--
-- Name: ApprovalRequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ApprovalRequest_id_seq"', 19, true);


--
-- Name: BalanceEntry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."BalanceEntry_id_seq"', 1, false);


--
-- Name: BalanceReportIssued_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."BalanceReportIssued_id_seq"', 3, true);


--
-- Name: BalanceReportTemplate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."BalanceReportTemplate_id_seq"', 26, true);


--
-- Name: BalanceReport_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."BalanceReport_id_seq"', 1, false);


--
-- Name: BankAccount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."BankAccount_id_seq"', 8, true);


--
-- Name: BankStatement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."BankStatement_id_seq"', 86, true);


--
-- Name: BudgetType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."BudgetType_id_seq"', 13, true);


--
-- Name: Contractor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Contractor_id_seq"', 7, true);


--
-- Name: DisbursementGroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."DisbursementGroup_id_seq"', 42, true);


--
-- Name: DisbursementItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."DisbursementItem_id_seq"', 98, true);


--
-- Name: MoneyTransaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."MoneyTransaction_id_seq"', 1, false);


--
-- Name: PaymentRecord_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."PaymentRecord_id_seq"', 3, true);


--
-- Name: Permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Permission_id_seq"', 22, true);


--
-- Name: Reconciliation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Reconciliation_id_seq"', 1, false);


--
-- Name: RolePermission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."RolePermission_id_seq"', 57, true);


--
-- Name: SchoolInfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."SchoolInfo_id_seq"', 34, true);


--
-- Name: TaxCertificate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."TaxCertificate_id_seq"', 1, false);


--
-- Name: TaxPaymentSummary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."TaxPaymentSummary_id_seq"', 1, false);


--
-- Name: TaxSubmission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."TaxSubmission_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."User_id_seq"', 5, true);


--
-- Name: WorkflowAction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."WorkflowAction_id_seq"', 42, true);


--
-- Name: WorkflowSetting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."WorkflowSetting_id_seq"', 2, true);


--
-- PostgreSQL database dump complete
--

\unrestrict gOoDwomMLRiF9UuapXJh5NSkhN5S8hRgGmtWk2WauyoaV8FWG6NbsH0ycHwEiMN


-- Reset all sequences after data import
SELECT setval('"SchoolInfo_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "SchoolInfo"));
SELECT setval('"User_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "User"));
SELECT setval('"Permission_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "Permission"));
SELECT setval('"RolePermission_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "RolePermission"));
SELECT setval('"BankAccount_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "BankAccount"));
SELECT setval('"BudgetType_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "BudgetType"));
SELECT setval('"ApprovalRequest_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "ApprovalRequest"));
SELECT setval('"DisbursementGroup_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "DisbursementGroup"));
SELECT setval('"DisbursementItem_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "DisbursementItem"));
SELECT setval('"WorkflowAction_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "WorkflowAction"));
SELECT setval('"WorkflowSetting_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "WorkflowSetting"));
SELECT setval('"MoneyTransaction_id_seq"', COALESCE((SELECT MAX(id) FROM "MoneyTransaction"), 1), false);
SELECT setval('"TaxCertificate_id_seq"', COALESCE((SELECT MAX(id) FROM "TaxCertificate"), 1), false);
SELECT setval('"TaxPaymentSummary_id_seq"', COALESCE((SELECT MAX(id) FROM "TaxPaymentSummary"), 1), false);
SELECT setval('"BalanceReport_id_seq"', COALESCE((SELECT MAX(id) FROM "BalanceReport"), 1), false);
SELECT setval('"BalanceEntry_id_seq"', COALESCE((SELECT MAX(id) FROM "BalanceEntry"), 1), false);
SELECT setval('"BalanceReportTemplate_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "BalanceReportTemplate"));
SELECT setval('"BalanceReportIssued_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "BalanceReportIssued"));
SELECT setval('"Contractor_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "Contractor"));
SELECT setval('"PaymentRecord_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "PaymentRecord"));
SELECT setval('"TaxSubmission_id_seq"', COALESCE((SELECT MAX(id) FROM "TaxSubmission"), 1), false);
SELECT setval('"BankStatement_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "BankStatement"));
SELECT setval('"Reconciliation_id_seq"', COALESCE((SELECT MAX(id) FROM "Reconciliation"), 1), false);
