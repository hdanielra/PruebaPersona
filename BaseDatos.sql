USE [PruebaPersona]
GO

/****** Object:  Table [dbo].[Persona]    Script Date: 21/01/2022 10:54:35 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Persona](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NULL,
	[apellido] [varchar](100) NULL
) ON [PRIMARY]
GO



INSERT INTO [dbo].[Persona] ([nombre], [apellido] ) VALUES ('Maria', 'Duran');
INSERT INTO [dbo].[Persona] ([nombre], [apellido] ) VALUES ('Jesus', 'Martinez');
INSERT INTO [dbo].[Persona] ([nombre], [apellido] ) VALUES ('Jose', 'Romero');
INSERT INTO [dbo].[Persona] ([nombre], [apellido] ) VALUES ('Laura', 'Gomez');
INSERT INTO [dbo].[Persona] ([nombre], [apellido] ) VALUES ('Erika', 'Prada');






USE [PruebaPersona]
GO

/****** Object:  StoredProcedure [dbo].[spBuscarPersona]    Script Date: 21/01/2022 8:55:41 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spBuscarPersona]
@nombre VARCHAR(100),  @cuantos int OUTPUT 
as
select @cuantos = count(1) from [dbo].[Persona]
where nombre = @nombre;
GO



USE [PruebaPersona]
GO

/****** Object:  StoredProcedure [dbo].[spBuscarPersonaxId]    Script Date: 21/01/2022 8:56:01 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spBuscarPersonaxId]
@id int
as

-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [id]
			,[nombre],[apellido]
	from [dbo].[Persona]
	where [id] = @Id
GO





USE [PruebaPersona]
GO

/****** Object:  StoredProcedure [dbo].[spEditarPersona]    Script Date: 21/01/2022 8:56:17 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spEditarPersona]
@nombre VARCHAR(100),
@apellido VARCHAR(100),
@id INT
AS 

UPDATE [dbo].[Persona]
   SET [nombre] = @nombre,[apellido] = @apellido
 WHERE [id] = @id



GO


USE [PruebaPersona]
GO

/****** Object:  StoredProcedure [dbo].[spEliminarPersona]    Script Date: 21/01/2022 8:56:28 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[spEliminarPersona]
@id int
as
delete from [dbo].[Persona] where [id]=@id
GO


USE [PruebaPersona]
GO

/****** Object:  StoredProcedure [dbo].[spInsertarPersona]    Script Date: 21/01/2022 8:56:41 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spInsertarPersona]
@nombre VARCHAR(100), @apellido VARCHAR(100)
AS 

INSERT INTO [dbo].[Persona]
           ([nombre], [apellido] )
     VALUES
           (@nombre, @apellido)


GO


USE [PruebaPersona]
GO

/****** Object:  StoredProcedure [dbo].[spListarPersona]    Script Date: 21/01/2022 8:56:55 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[spListarPersona]
as
select * from [dbo].[Persona]
GO

